// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To stop current process, press CTRL + C in terminal.

const axios = require('axios')

async function populateCmsImagesCollection(cmsImagesCollection) {
  const imagesResponse = await axios.get(process.env.GRIDSOME_CMS_IMAGES_URL);
  if (imagesResponse && imagesResponse.status === 200) {
    const imagesJson = imagesResponse.data
    console.log(`INFO: Received metadata for ${imagesJson.length} CMS images`)
    for(let img of imagesJson) {
      // TODO: decide if to add criteria to exclude some of the images
      //       from being processed
      // (I haven't found a conclusive way to determine if an image is
      //  actually referenced anywhere in the CMS content - particularly
      //  images embedded inside Rich Text)
      if(img.url) {
        cmsImagesCollection.addNode(img)
        console.log(`INFO: added image ${img.name} to cmsImagesCollection`)
      } else {
        console.log(`INFO: excluded image ${img.name} from cmsImagesCollection`)
      }
    }
  } else {
    console.error("ERROR: Unable to fetch CMS images")
  }
}

module.exports = function (api, options) {
  api.loadSource(async ({ addCollection }) => {
    // Data Store API docs: https://gridsome.org/docs/data-store-api/

    await populateCmsImagesCollection(addCollection('CmsImages'))
    

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
