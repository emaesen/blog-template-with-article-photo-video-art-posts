# Template for a personal blog/photo/article website

A mobile-friendly, hackable, minimalistic yet full-featured blog-style single-page-application website template for Gridsome/Vue.js that uses Strapi CMS for content and GraphQL as data layer. You may use any database that's supported by Strapi (default SQLite)

No cloud dependencies - the whole site and CMS can be installed and run locally on your PC/laptop.

In development mode, the website uses hot-reload to automatically refresh sections of the page that have been changed.

In production mode, each dynamic page is pre-generated to its own static HTML file for optimal access performance and for search engine optimization.

This project used [strapi-starter-gridsome-portfolio](https://github.com/strapi/strapi-starter-gridsome-portfolio) as its original foundation, expanded upon that, and has a much more complete feature set available out-of-the-box.

## Project status

This project is in the final stages of development.

It is complete enough to try out.

## Intended audience

This project is intended for people with an intermediate to advanced knowledge of JavaScript and website development. Either to use as a basis to create a personal website for themselves, or to use as a design template to create websites for others.

## Features

This project has two components:

1. A headless CMS to manage content
2. A mobile-friendly single-page-application web site, with static file generation for SEO purposes

*The CMS* supports individual pages plus collections of articles, photos, art, notes and video. Taxonomy is supported with categories, collections/series and threads.

*The webapp* uses principles of the [IndieWeb](https://indieweb.org/) to tag relevant content for discovery. It has a 'home', 'biography' and 'about' page, and several dynamic variations of 'posts' pages: 'articles', 'photos',  'videos', 'art' and 'notes'. Each with pagination support and associated taxonomy pages based on 'category', 'series' and/or 'thread'. All cross-linked.

*Light and Dark color modes* are supported with automatic switch based on OS settings or through manual toggle.

*The color scheme* can be replaced easily by redefining a core set of colors.

*Fonts* can be replaced easily by redefining a core set of font families.

*Animated SVG icons* are custom designed.

The IndieWeb proposes syndication methods (so you can own your data, publish to your personal website first and from there syndicate to large social media sites). Those are *not* implemented in this project.

## Technology used

Javscript framework for dynamic web apps: [Vue.js](https://vuejs.org/)

Static site generator: [Gridsome](https://gridsome.org/)

Headless content management system: [Strapi](https://strapi.io/)

Query language: [GraphQL](https://graphql.org/)

Database: [MongoDB](https://www.mongodb.com/)

If used, `MongoDB` should be installed separately, globally on the host system. *On windows 10 I run into daily issues where the MongoDB service stops unexpectedly - so I suggest using a different database.*
You may also choose any other database supported by Strapi; by default it will use [SQLite](https://sqlite.org/).

## Installation

`Vue.js` and `Gridsome` are installed in this project's `webapp` directory.

(run `npm install` in the `webapp` directory)

`Strapi` is installed in this project's `cms` directory.

(run `npm install` in the `cms` directory)

(You'll also need to setup the Strapi database connections - see Strapi documentation)

## Images

For a clean look, images that are uploaded to Strapi-cms should be of consistent height/width ratio. The recommended image size for the photos section is 1165px x 720px (phi-ratio).

## Tools used

(This is not an endorsement for the resources listed below. It's simply the set of tools that I happened to use for this project)

Favicon icon generator: [RealFaviconGenerator](https://realfavicongenerator.net/)

Image file-size optimizer: [OptimiZilla](https://imagecompressor.com/)

Self-hosted public-domain webfont loader: [FontSource](https://github.com/fontsource/fontsource). Select a font at <https://fonts.google.com> and make it available in this project with `npm install fontsource-your-selected-font` in the `webapp` folder.

Geometrical SVGs designed with: [LibreCAD](https://librecad.org/)

Free-hand SVGs designed with: [InkScape](https://inkscape.org/). Use *"Edit-> Resize Page to Selection"* to reduze the box size, and *"Save as Optimized SVG"* to minimize metadata in the SVG output.

Color palette designer [Paletton](http://paletton.com/)

Visual designer for [cubic bezier](https://cubic-bezier.com/) animations

CSS/SVG/JS animation designs prototyped in [CodePen](https://codepen.io/emaesen)

Library for free [svg icons](https://iconmonstr.com/)

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
