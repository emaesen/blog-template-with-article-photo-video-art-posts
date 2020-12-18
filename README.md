# Starter project for a personal blog/photo/article website

A Gridsome Vue.js Strapi project

## ************** WORK IN PROGRESS **************

This is a starter project for a personal blog/gallery website.

It features a Strapi-cms powered dynamic Vue.js website, pre-build with Gridsome.

This project used [strapi-starter-gridsome-portfolio](https://github.com/strapi/strapi-starter-gridsome-portfolio) as its original foundation, expanded upon that, and has a much more complete feature set available out-of-the-box.

## Intended audience

This project is intended for people with an intermediate to advanced knowledge of JavaScript and website development. Either to use as a basis to create a personal website for themselves, or to use as a design template to create websites for others.

## Features

This project has two components:

1. A headless CMS to manage content
2. A mobile-friendly single-page-application web site, with static file generation capability for SEO purposes

The *CMS* supports individual pages plus collections of articles, photos, notes and video. Taxonomy is supported with categories, collections/series and threads.

The *webapp* uses principles of the [IndieWeb](https://indieweb.org/) to tag relevant content for discovery. It has a 'home' and 'about' page, and several dynamic variations of 'posts' pages: 'articles', 'photos', 'notes' and 'videos'. Each with pagination support and associated taxonomy pages based on 'category', 'series' or 'thread'. All cross-linked.

Light and Dark color modes are supported with automatic switch based on OS settings or through manual toggle.

The color scheme can be replaced easily by redefining a core set of colors.

Fonts can be replaced easily by redefining a core set of font families.

The IndieWeb proposes syndication methods (so you can own your data, publish to your personal website first and from there syndicate to large social media sites). Those are *not* implemented in this project.

## Technology used

Javscript framework for dynamic web apps: [Vue.js](https://vuejs.org/)
Static site generator: [Gridsome](https://gridsome.org/)
Headless content management system: [Strapi](https://strapi.io/)
Database: [MongoDB](https://www.mongodb.com/)

`Vue.js` and `Gridsome` are installed in this project's `webapp` directory. (run `npm install` in that directory)
`Strapi` is installed in this project's `cms` directory. (run `npm install` in that directory)

If used, `MongoDB` should be installed separately, globally on the host system.
You may also choose any other database supported by Strapi; by default it will use [SQLite](https://sqlite.org/).

## Images

For a clean look, images that are uploaded to Strapi-cms should be of consistent height/width ratio. A phi-ratio is pleasing to the eye and the recommended image size is 1165px x 720px.

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
