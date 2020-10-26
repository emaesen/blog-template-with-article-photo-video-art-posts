// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To stop current process, press CTRL + C in terminal.

const axios = require('axios')

async function populateCmsMediaCollections(addCollection) {
  const mediaResponse = await axios.get(process.env.GRIDSOME_CMS_IMAGES_URL);
  let count = 0
  if (mediaResponse && mediaResponse.status === 200) {
    const mediaJson = mediaResponse.data
    console.info(`INFO: Received metadata for ${mediaJson.length} CMS media assets`)
    count = await populateCmsMediaCollection(mediaJson, "image", addCollection('CmsImages'), count)
    count = await populateCmsMediaCollection(mediaJson, "video", addCollection('CmsVideos'), count)
    count = await populateCmsMediaCollection(mediaJson, "audio", addCollection('CmsAudios'), count)
  } else {
    console.error("ERROR: Unable to fetch CMS media assets metadata")
  }
}

async function populateCmsMediaCollection(mediaJson, type, cmsCollection, count) {
  const filteredMediaJson = mediaJson.filter(media =>media.mime.startsWith(type))
  for(let media of filteredMediaJson) {
    count += 1
    // TODO: decide if to add criteria to exclude some of the media assets
    //       from being processed
    // (I haven't found a conclusive way to determine if media asset is
    //  actually referenced anywhere in the CMS content - particularly
    //  media assets embedded inside Rich Text)
    if(media.mime.startsWith(type)) {
      cmsCollection.addNode(media)
      console.info(`INFO: ${count} CMS ${type} Collection: added ${media.name}`)
    } else {
      console.info(`INFO: ${count} CMS ${type} Collection: excluded ${media.name}`)
    }
  }
  return count;
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
