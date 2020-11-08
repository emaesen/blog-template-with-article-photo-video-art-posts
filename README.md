# A Gridsome Vue.js Strapi project

This is a starter project for a Strapi-cms powered dynamic Vue.js website, pre-build with Gridsome.

This project is based upon [strapi-starter-gridsome-portfolio](https://github.com/strapi/strapi-starter-gridsome-portfolio).

## Technology used

Javscript framework for dynamic web apps: [Vue.js](https://vuejs.org/)
Static site generator: [Gridsome](https://gridsome.org/)
Headless content management system: [Strapi](https://strapi.io/)
Database: [MongoDB](https://www.mongodb.com/)

Vue.js and Gridsome are installed in this project's `webapp` directory. (run `npm install` in that directory)
Strapi is installed in this project's `cms` directory. (run `npm install` in that directory)
MongoDB should be installed separately, globally on the host system.

## Images

For a clean look, images that are uploaded to Strapi-cms should be of consistent height/width ratio. A phi-ratio is pleasing to the eye and the recommended image size is 1165px x 720px.

## Tools used

(This is not an endorsement for the resources listed below. It's simply the set of tools that I happened to use for this project)

Favicon icon generator: [RealFaviconGenerator](https://realfavicongenerator.net/)

Image file-size optimizer: [OptimiZilla](https://imagecompressor.com/)

Self-hosted public-domain webfont loader: [FontSource](https://github.com/fontsource/fontsource)

Color palette designer [Paletton](http://paletton.com/)

Visual designer for [cubic bezier](https://cubic-bezier.com/) animations

Library for free [scg icons](https://iconmonstr.com/)

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
