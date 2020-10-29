# A Gridsome Vue.js Strapi project

This is a starter project for a Strapi-cms powered dynamic Vue.js website, pre-build with Gridsome.

This project is based upon [strapi-starter-gridsome-portfolio](https://github.com/strapi/strapi-starter-gridsome-portfolio).

## Tools used

(This is not an endorsement for the resources listed below. It's simply the set of tools that I happened to use for this project)

Favicon icon generator: [RealFaviconGenerator](https://realfavicongenerator.net/)

Image size optimizer: [OptimiZilla](https://imagecompressor.com/)

Self-hosted public-domain webfont loader: [FontSource](https://github.com/fontsource/fontsource)

  1. [search for](https://fontsource.github.io/search-directory/) and npm install the desired font.
  2. `require` the desired font in main.js
  3. reference the desired font in your css, e.g. in layouts/Default.vue

## Versions

### V0.1.0

V0.1.0 is a reference version to show a solution that creates extra graphql collections for downloaded CMS media assets in `gridsome.server.js`. These collections are not needed since the `cms` graphql schema already includes the media files data:

```javascript
query {
  cms {
    files {
      url
      mime
      # etc
    }
  }
}
```
