// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To stop current process, press CTRL + C in terminal.

/* NOTE:
 * There is room for improvement in this setup:
 * 1) The media file information is derived from an API call 
 *    to the CMS server, but that info is also already available 
 *    in the cms graphql schema. I have not (yet) found a clean
 *    hook within the server API to access graphql and do some side
 *    processing. Were that possible, then the extra API call can
 *    be replaced with a query of the cms graphql.
 * 2) Code branches related to INCLUDE_DERIVED_MEDIA_ASSETS are
 *    probably never used and can be removed to improve clarity.
 * 3) Code branches related to CREATE_CMS_MEDIA_COLLECTIONS are
 *    probably never used and can be removed to improve clarity.
 *    These embed the INCLUDE_DERIVED_MEDIA_ASSETS code branches so
 *    this covers item 2) above as well.
 */

const axios = require('axios').default
const path = require('path')
const fse = require('fs-extra')

const CREATE_CMS_MEDIA_COLLECTIONS = false
const INCLUDE_DERIVED_MEDIA_ASSETS = false

const CMS_URL = process.env.CMS_URL
const CMS_MEDIA_URL = process.env.CMS_MEDIA_URL
const CMS_MEDIA_PATH = process.env.GRIDSOME_CMS_MEDIA_PATH
const CMS_MEDIA_TARGET_PATH = path.join(process.cwd(), 'src', CMS_MEDIA_PATH)
const CMS_POSTS_PAGELIMIT = process.env.GRIDSOME_CMS_POSTS_PAGELIMIT


async function getListOfCmsMediaFiles(addCollection) {
  let tally = {count:0, mediaFiles:[]}
  let mediaResponse
  try {
    mediaResponse = await axios.get(CMS_MEDIA_URL)
  } catch (error) {
    console.error(`ERROR: error retrieving ${CMS_MEDIA_URL}. MAKE SURE THE STRAPI CMS SERVER IS RUNNING!`, {error})
  }

  if (mediaResponse && mediaResponse.status === 200) {
    const mediaAssets = mediaResponse.data.map(asset => {
      if (CREATE_CMS_MEDIA_COLLECTIONS) {
        // only allow a select set of properties to be processed further
        let props = ["url", "mime", "id", "name", "ext", "width", "height", "size", "hash", "formats", "updatedAt", "alternativeText", "caption"]
        let simplifiedAsset = {}
        props.forEach(prop => {
          simplifiedAsset[prop] = asset[prop]
        })
        return simplifiedAsset
      } else {
        return asset.url
      }
    })
    console.info(`INFO: Received metadata for ${mediaAssets.length} CMS media assets from  ${CMS_MEDIA_URL}`)
    if (CREATE_CMS_MEDIA_COLLECTIONS) {
      tally = await populateCmsMediaCollection(mediaAssets, "image", addCollection('CmsImages'), tally)
      tally = await populateCmsMediaCollection(mediaAssets, "video", addCollection('CmsVideos'), tally)
      tally = await populateCmsMediaCollection(mediaAssets, "audio", addCollection('CmsAudios'), tally)
    } else {
      tally.count = mediaAssets.length
      tally.mediaFiles = mediaAssets
    }
  } else {
    console.error("ERROR: Unable to process CMS media assets metadata")
  }
  console.log(`Files to retrieve from ${CMS_URL}:`, tally.mediaFiles)
  return tally.mediaFiles
}


async function populateCmsMediaCollection(mediaJson, type, cmsCollection, tally) {
  const filteredMediaJson = mediaJson.filter(media =>media.mime.startsWith(type))
  let count = tally.count
  let mediaFiles = tally.mediaFiles
  for(let media of filteredMediaJson) {
    count += 1
    // TODO: decide whether to add criteria to exclude some of
    //       the media assets from being processed
    // (I haven't found a conclusive way to determine if a media asset is
    //  actually referenced anywhere in the CMS content - particularly
    //  media assets embedded inside Rich Text)
    if(media.mime.startsWith(type)) {
      // add media data to the collection
      cmsCollection.addNode(media)
      console.info(`INFO: ${count} CMS ${type} Collection: added ${media.name}`)
      // populate mediaFiles aray with all available media files
      mediaFiles.push(media.url)
      if (media.formats && INCLUDE_DERIVED_MEDIA_ASSETS) {
        // also include alternative formats of the asset
        for(let [_altKey,alt] of Object.entries(media.formats)) {
          mediaFiles.push(alt.url)
        }
      }
    } else {
      console.info(`INFO: ${count} CMS ${type} Collection: excluded ${media.name}`)
    }
  }
  return {count, mediaFiles};
}

async function downloadCmsMediaFile(file) {
  // remove any subfolder in cms filename
  const targetFile = path.join(CMS_MEDIA_TARGET_PATH, file.replace(/\/.*\//,""))
  const targetFileExists = await fse.pathExists(targetFile)
  // download the CMS media file, unless it exists already
  if (!targetFileExists) {
    try {
      let response = await axios({
        method: 'get',
        url: CMS_URL + file,
        responseType: 'stream'
      })
      await response.data.pipe(fse.createWriteStream(targetFile))
      console.info("INFO: created " + targetFile)
    } catch (error) {
      console.error(`ERROR: error retrieving ${file}`)
      console.error(error)
    }
  }
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function downloadCmsMediaFiles(files) {
  await asyncForEach(files, async file => {
    await downloadCmsMediaFile(file)
  })
}

function createPostsRoutes(opts, createPage) {
  if (opts.count > 0) {

    // create route for each indivual post page
    // except if skipIndividualPages==true
    if (!opts.skipIndividualPages) {
      console.info("INFO: create individual " + opts.type + " pages")
      opts.data.forEach((post) => {
        createPage({
          path: `/p/${opts.type}/${post.slug}`,
          component: `./src/templates/${opts.component}.vue`,
          context: {
            slug: post.slug
          }
        })
      })
    } else {
      createPage({
        path: `/p/${opts.type}/:slug`,
        component: `./src/templates/${opts.component}.vue`
      })
    }

    console.info("INFO: create " + opts.type + " entry page + pagination variants")
    // create routes for the posts-type entry page, with pagination
    const nrOfPaginationPages = Math.ceil(opts.count / CMS_POSTS_PAGELIMIT)
    createPage({
      path: `/p/${opts.type}/`,
      component: `./src/templates/${opts.component}s.vue`,
      context: {
        page: 0,
        limit: 1 * CMS_POSTS_PAGELIMIT,
        start: 0,
        sort: "createdAt:desc",
        totalPages: nrOfPaginationPages
      }
    })
    //create pagination pages
    for (let page = 0; page < nrOfPaginationPages; page++) {
      // for default sort...
      createPage({
        path: `/p/${opts.type}/${page}`,
        component: `./src/templates/${opts.component}s.vue`,
        context: {
          page: page,
          limit: 1 * CMS_POSTS_PAGELIMIT,
          start: 1 * page * CMS_POSTS_PAGELIMIT,
          sort: "createdAt:desc",
          totalPages: nrOfPaginationPages
        }
      })
      // ...and for reversed sort
      createPage({
        path: `/p/${opts.type}/${page}/asc`,
        component: `./src/templates/${opts.component}s.vue`,
        context: {
          page: page,
          limit: 1 * CMS_POSTS_PAGELIMIT,
          start: 1 * page * CMS_POSTS_PAGELIMIT,
          sort: "createdAt:asc",
          totalPages: nrOfPaginationPages
        }
      })
    }

    if (opts.type!=="notes") {
      console.info("INFO: create " + opts.type + "-level category page")
      // create dynamic category page
      createPage({
        path: `/p/${opts.type}/c/:category`,
        component: `./src/templates/Category.vue`
      })

      console.info("INFO: create " + opts.type + "-level series page")
      // create dynamic series (collection) page
      createPage({
        path: `/p/${opts.type}/s/:series`,
        component: `./src/templates/Series.vue`
      })
    }

    if (opts.type==="notes") {
      console.info("INFO: create " + opts.type + "-level thread page")
      // create dynamic thread page (for Notes only)
      createPage({
        path: `/p/${opts.type}/t/:thread`,
        component: `./src/templates/Thread.vue`
      })
    }
  } else {
    console.info("INFO: skip " + opts.type + " pages")
  }
}

module.exports = function (api, options) {

  api.loadSource(async ({ addCollection }) => {
    // Data Store API docs: https://gridsome.org/docs/data-store-api/
    const mediaFiles = await getListOfCmsMediaFiles(addCollection)
    await downloadCmsMediaFiles(mediaFiles)
  })

  // api.onCreateNode(options => {
  //   console.log("LOG: onCreateNode",{options})
  // })

  api.createPages(async ({ createPage, graphql }) => {
    // Pages API docs: https://gridsome.org/docs/pages-api/

    /* == Create pages for the cms articles == */

    // The cms graphql data is loaded with the source-graphql
    // plugin, defined in gridsome.config.js.

    // find all post type slugs
    const { data } = await graphql(`{
      cms {
        articlesCount
        articles {
          slug
        }
        notesCount
        notes {
          slug
        }
        photosCount
        photos {
          slug
        }
        videosCount
        videos {
          slug
        }
        artsCount
        arts {
          slug
        }
        categoriesCount
        collectionsCount
      }
    }`)

    createPostsRoutes({
      type: "articles",
      count: data.cms.articlesCount,
      data: data.cms.articles,
      component: "Article"
    }, createPage)

    createPostsRoutes({
      type: "notes",
      count: data.cms.notesCount,
      data: data.cms.notes,
      component: "Note",
      skipIndividualPages: true
    }, createPage)

    createPostsRoutes({
      type: "photos",
      count: data.cms.photosCount,
      data: data.cms.photos,
      component: "Photo"
    }, createPage)

    createPostsRoutes({
      type: "videos",
      count: data.cms.videosCount,
      data: data.cms.videos,
      component: "Video"
    }, createPage)

    createPostsRoutes({
      type: "arts",
      count: data.cms.artsCount,
      data: data.cms.arts,
      component: "Art"
    }, createPage)

    if (data.cms.categoriesCount > 0) {
      // create aggregate level category page
      console.info("INFO: create posts-level category page")
      createPage({
        path: `/posts/c/:category`,
        component: `./src/templates/Category.vue`
      })
    }

    if (data.cms.collectionsCount > 0) {
      // create aggregate level series (collection) page
      console.info("INFO: create posts-level series page")
      createPage({
        path: `/posts/s/:series`,
        component: `./src/templates/Series.vue`
      })
    }

  })

}
