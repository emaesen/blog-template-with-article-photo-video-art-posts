// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To stop current process, press CTRL + C in terminal.

/* NOTE:
 * There is potential room for improvement in this setup:
 * 1) The media file information is derived from an API call 
 *    to the CMS server, but that info is also already available 
 *    in the cms graphql schema. I have not (yet) found a clean
 *    hook within the server API to access graphql and do some side
 *    processing. Were that possible, then the extra API call can
 *    be replaced with a query of the cms graphql.
 */

const { downloadCmsMediaFiles } = require('./utils/media')
const { createPages } = require('./utils/pages')
const { beforeBuild,
        afterBuild } = require('./utils/build')

module.exports = function (api, options) {

  api.loadSource(async store => {
    await beforeBuild(store)

    // Data Store API docs: https://gridsome.org/docs/data-store-api/
    await downloadCmsMediaFiles()
  })

  // api.onCreateNode(options => {
  //   console.log("LOG: onCreateNode",{options})
  // })

  api.afterBuild(async ({context, config, queue, redirects}) => {
    await afterBuild(config, redirects)
  })

  api.createPages(async ({ createPage, graphql }) => {
    // Pages API docs: https://gridsome.org/docs/pages-api/
    /* == Create pages for the cms articles == */
    await createPages(createPage, graphql)
  })

}
