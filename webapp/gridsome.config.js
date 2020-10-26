// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Vue-Gridsome-Strapi-concept',
  siteDescription: 'A starter webapp using Vue.js, Gridsome and Strapi',
  siteUrl: '',
  titleTemplate: '%s',
  metadata: {
    version: 'V0.1.0',
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
  ]
}
