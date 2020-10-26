// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To stop current process, press CTRL + C in terminal.

const axios = require('axios').default

async function populateCmsMediaCollections(addCollection) {
  let tally = {count:0, mediaFiles:[]}
  let mediaResponse
  try {
    mediaResponse = await axios.get(process.env.CMS_MEDIA_URL)
  } catch (error) {
    console.error(`ERROR: ${error.response.statusText} error retrieving ${process.env.CMS_MEDIA_URL}`)
  }

  if (mediaResponse && mediaResponse.status === 200) {
    const mediaJson = mediaResponse.data.map(asset => {
      // only allow a select set of properties to be processed further
      let props = ["id", "url", "name", "ext", "width", "height", "size", "mime", "hash", "formats", "updatedAt", "alternativeText", "caption"]
      let simplifiedAsset = {}
      props.forEach(prop => {
        simplifiedAsset[prop] = asset[prop]
      })
      return simplifiedAsset
    })
    console.info(`INFO: Received metadata for ${mediaJson.length} CMS media assets from  ${process.env.CMS_MEDIA_URL}`)
    tally = await populateCmsMediaCollection(mediaJson, "image", addCollection('CmsImages'), tally)
    tally = await populateCmsMediaCollection(mediaJson, "video", addCollection('CmsVideos'), tally)
    tally = await populateCmsMediaCollection(mediaJson, "audio", addCollection('CmsAudios'), tally)
  } else {
    console.error("ERROR: Unable to process CMS media assets metadata")
  }
  console.log("External files to retrieve:", tally.mediaFiles)
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
      cmsCollection.addNode(media)
      console.info(`INFO: ${count} CMS ${type} Collection: added ${media.name}`)
      mediaFiles.push(media.url)
      if (media.formats) {
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

module.exports = function (api, options) {
  api.loadSource(async ({ addCollection }) => {
    // Data Store API docs: https://gridsome.org/docs/data-store-api/
    await populateCmsMediaCollections(addCollection)
  })

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
