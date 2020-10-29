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
const GRIDSOME_CMS_MEDIA_PATH = process.env.GRIDSOME_CMS_MEDIA_PATH
const CMS_MEDIA_TARGET_PATH = path.join(process.cwd(), 'src', GRIDSOME_CMS_MEDIA_PATH)


async function getListOfCmsMediaFiles(addCollection) {
  let tally = {count:0, mediaFiles:[]}
  let mediaResponse
  try {
    mediaResponse = await axios.get(CMS_MEDIA_URL)
  } catch (error) {
    console.error(`ERROR: ${error.response.statusText} error retrieving ${CMS_MEDIA_URL}`)
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
  // remove any subfolder
  const targetFile = path.join(CMS_MEDIA_TARGET_PATH, file.replace(/\/.*\//,""))

  // download the CMS media file, unless it exists already
  if (await fse.exists(targetFile)) {
    //console.debug("INFO: file exists " + targetFile)
  } else {
    try {
      response = await axios({
        method: 'get',
        url: CMS_URL + file,
        responseType: 'stream'
      })
      response.data.pipe(fse.createWriteStream(targetFile))
      console.info("INFO: created " + targetFile)
    } catch (error) {
      console.error(`ERROR: error retrieving ${file}`)
      console.error(error)
    }
  }
}

async function downloadCmsMediaFiles(files) {
  await files.forEach(async file => {
    await downloadCmsMediaFile(file)
  })
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

    // find all article slugs
    const { data } = await graphql(`{
      cms {
        articles {
          slug
        }
      }
    }`)

    // Create a page for each article
    data.cms.articles.forEach((article) => {
      createPage({
        path: `/article/${article.slug}`,
        component: './src/templates/Article.vue',
        context: {
          slug: article.slug
        }
      })
    })
  })

}
