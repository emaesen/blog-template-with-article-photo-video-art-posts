// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: '',
  siteDescription: '',
  siteUrl: '',
  titleTemplate: '%s',
  metadata: {
    version: 'V1.1.0',
  },
  icon: {
    favicon: './static/images/icons/favicon-512x512.png',
    touchicon: './static/images/icons/apple-touch-icon.png'
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

  images: {
    // don't compress if images are already optimized before strapi upload
    compress: false,
    defaultBlur: 1000,
  },

  chainWebpack: config => {
    // reference: base webpack config:
    // https://github.com/gridsome/gridsome/blob/master/gridsome/lib/webpack/createBaseConfig.js

  },
}
