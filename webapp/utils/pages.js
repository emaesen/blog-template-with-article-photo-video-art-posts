const { CMS_POSTS_PAGELIMIT } = require('./constants')
const { logMsg } = require('./log')


function createPostsRoutes(opts, createPage) {
  if (opts.count > 0) {

    const componentBase = `./src/templates/${opts.component}`
    let component = componentBase + '.vue'
    const basePath = `/p/${opts.type}/`

    // create route for each indivual post page
    // except if skipIndividualPages==true
    if (!opts.skipIndividualPages) {
      logMsg("create individual " + opts.type + " pages")
      opts.data.forEach((post) => {
        createPage({
          path: `${basePath}${post.slug}`,
          component: component,
          context: {
            slug: post.slug
          }
        })
      })
    } else {
      createPage({
        path: `${basePath}:slug`,
        component: component
      })
    }

    logMsg("create " + opts.type + " entry page + pagination variants")
    // create routes for the posts-type entry page, with pagination
    component = componentBase + 's.vue'

    //create main page
    const nrOfPaginationPages = Math.ceil(opts.count / CMS_POSTS_PAGELIMIT)
    const context = {
      page: 1,
      limit: 1 * CMS_POSTS_PAGELIMIT,
      start: 0,
      sort: "createdAt:desc",
      totalPages: nrOfPaginationPages,
      basePath: basePath,
      subPath: ""
    }
    const subPathAsc = "asc/"

    createPage({
      path: `${basePath}`,
      component: component,
      context: context
    })

    //create reverse sort variant of main page
    createPage({
      path: `${basePath}${subPathAsc}`,
      component: component,
      context: {...context, ...{
        sort: "createdAt:asc",
        subPath: subPathAsc
      }}
    })

    //create pagination pages
    for (let page = 0; page < nrOfPaginationPages; page++) {
      const pageDisplayNr = page + 1
      const contextSort = {...context, ...{
        page: pageDisplayNr,
        start: 1 * page * CMS_POSTS_PAGELIMIT
      }}

      // for default sort...
      const contextDesc = {...contextSort, ...{
        sort: "createdAt:desc",
        subPath: ""
      }}
      createPage({
        path: `${basePath}${pageDisplayNr}`,
        component: component,
        context: contextDesc
      })

      // ...and for reversed sort
      const contextAsc = {...contextSort, ...{
        sort: "createdAt:asc",
        subPath: subPathAsc
      }}
      createPage({
        path: `${basePath}${subPathAsc}${pageDisplayNr}`,
        component: component,
        context: contextAsc
      })
    }

    if (opts.type!=="notes") {
      logMsg("create " + opts.type + "-level category page")
      // create dynamic category page
      createPage({
        path: `${basePath}c/:category`,
        component: `./src/templates/Category.vue`
      })

      logMsg("create " + opts.type + "-level series page")
      // create dynamic series (collection) page
      createPage({
        path: `${basePath}s/:series`,
        component: `./src/templates/Series.vue`
      })
    }

    if (opts.type==="notes") {
      logMsg("create " + opts.type + "-level thread page")
      // create dynamic thread page (for Notes only)
      createPage({
        path: `${basePath}t/:thread`,
        component: `./src/templates/Thread.vue`
      })
    }
  } else {
    logMsg("skip " + opts.type + " pages")
  }
}

module.exports.createPages = async function(createPage, graphql) {
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
      logMsg("create posts-level category page")
      createPage({
        path: `/posts/c/:category`,
        component: `./src/templates/Category.vue`
      })
    }

    if (data.cms.collectionsCount > 0) {
      // create aggregate level series (collection) page
      logMsg("create posts-level series page")
      createPage({
        path: `/posts/s/:series`,
        component: `./src/templates/Series.vue`
      })
    }


}