// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Vue-Gridsome-Strapi-concept',
  siteDescription: 'A blog-style webapp using Vue.js, Gridsome and Strapi',
  siteUrl: '',
  titleTemplate: '%s',
  metadata: {
    version: 'V0.2.0',
  },
  icon: {
    favicon: './src/assets/images/icons/favicon.png',
    touchicon: './src/assets/images/icons/touch-icon.png'
  },
  plugins: [
    {
      use: '@gridsome/source-graphql',
      options: {
        url: (process.env.CMS_URL) + "/graphql",
        fieldName: 'cms',
        typeName: 'cmsTypes'
      }
    }
  ],
  chainWebpack: config => {
    // reference: base webpack config:
    // https://github.com/gridsome/gridsome/blob/master/gridsome/lib/webpack/createBaseConfig.js

    config.resolve
      .alias
      .set(`@${process.env.GRIDSOME_CMS_MEDIA_ALIAS}`, 
           `@${process.env.GRIDSOME_CMS_MEDIA_PATH}`)
      .end()

  },
}
