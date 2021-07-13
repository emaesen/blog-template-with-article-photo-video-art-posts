# Template for a personal blog/photo/article website

## Project summary

A mobile-friendly, hackable, minimalistic yet full-featured blog-style single-page-application (SPA) website template for `Gridsome` and `Vue.js` that uses `Vuex` for state management, `Strapi CMS` for content and `GraphQL` as data layer. To store the content, you may use any database that's supported by Strapi (default `SQLite`)

No cloud dependencies - the whole site and CMS can be installed and run locally on your PC/laptop.

In development mode, the website uses hot-reload to automatically refresh sections of the page that have been changed.

In production mode, pages are pre-generated to their own static HTML file for optimal access performance and for search engine optimization.

Simply upload/deploy the `webapp\dist` folder to your website host of choice. The website is static and does not require custom back-end code to run on the server so you can take advantage of the most basic service plan of your website host.

This project used [strapi-starter-gridsome-portfolio](https://github.com/strapi/strapi-starter-gridsome-portfolio) as its original foundation, expanded upon that, and has a much more complete feature set available out-of-the-box.

## Project status

This project is released.

My personal website [epvm.name](https://epvm.name) is generated entirely and solely with this project. It provides an overview of available functionality. Note that the opening animation will only appear if an SVG file with `id="signature"` has been provided (through the CMS).

## Intended audience

This project is intended for people with an intermediate to advanced knowledge of JavaScript and website development. It can be used either as a basis to create a personal website for themselves, or to use as a quick-start template to create websites for others.

As an author, you can manage your blog locally, with full control over the code and your content, and deploy a generated set of static files to your web host of choice.

## Website template features

- Modern, mobile-friendly Single Page Application
- Different post types
  - Article
  - Photo
  - Art
  - Video
  - Note
- Pages
  - Home
  - Biography
  - About
  - Posts (Articles/Photos/Art/Videos/Notes)
    - with pagination
- Posts & Pages allow for
  - Image Gallery
  - Rich Text content with customized Markdown formatting
    - Headers (H1 to H6)
    - Links
    - Images
    - Lists (ordered/unordered/description)
    - Tables (basic)
    - bold/italic/underlined/strike-through
    - Quotes
    - Code blocks and code snippets
    - Custom paragraph CSS classes
      - cursive
      - emphasize
      - note
      - boxed
      - mono
    - Custom "liquid tags"
      - emphasize
      - labeled note
      - side note
      - CSS class
- Taxonomy: category, series and thread
- SEO support
  - Open graph & twitter card meta tagging
  - Static web pages pre-generation
- IndieWeb tagging
- Minimal custom CSS
  - Light/Dark color mode
  - Easy to swap color scheme
    - 1 primary and 2 secondary colors, each with 5 gradations
  - Easy to swap font selections
    - 5 fonts: for body, header, emphasize, cursive and mono
- Minimal custom JS
  - No external libraries aside from the Gridsome/VueJs framework
  - Simple custom date formatting
  - Custom markdown parser with liquid tag support
  - Custom logging module in development mode
- Progressive lazy-loading images (220, 275, 370, 550, 840, 1100, 1680, 2200, 2520 and 3300 pixels) with default plain placeholder image
- Custom SVG icons
  - most animated
- HTML/JS/CSS minification
- user preferences are stored in Local and Session Storage

## Code organization

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

Javascript runtime environment: [Node.js](https://nodejs.org/en/)

Javascript framework for dynamic web apps: [Vue.js](https://vuejs.org/)

Web app state management: [Vuex](https://vuex.vuejs.org/)

Static site generator: [Gridsome](https://gridsome.org/)

Headless content management system: [Strapi](https://strapi.io/)

Data query language: [GraphQL](https://graphql.org/)

Database: [MongoDB](https://www.mongodb.com/)

If used, `MongoDB` should be installed separately, globally on the host system. *On windows 10 I run into daily issues where the MongoDB service stops unexpectedly - so I suggest using a different database.*
You may also choose any other database supported by Strapi; by default it will use [SQLite](https://sqlite.org/).

## Installation

### Install [Node.js](https://nodejs.org/en/)

### Clone this project

### Install CMS

`Strapi` is installed in this project's `cms` directory.

```bash
> cd [project-root-folder]/cms
> npm install
> npm build
```

You'll also need to setup the Strapi database connections - see Strapi documentation. A sample databace connection in case of SQLite DB is provided in `[project-root-folder]/cms/config/sample.database.js`

### Install WebApp

`Vue.js` and `Gridsome` are installed in this project's `webapp` directory.

```bash
> cd [project-root-folder]/webapp
> npm install
```

## Usage

### Add content to CMS

To start the strapi CMS:

```bash
> cd [project-root-folder]/cms
> npm run dev
```

Enter content at <http://localhost:1337/admin/>

Explore graphql at <http://localhost:1337/graphql>

### Develop/view WebApp

To run the webapp server in development mode:

```bash
> cd [project-root-folder]/webapp
> npm run dev
```

View hot-reload development version of webapp at <http://localhost:9011/>

### Generate deployable WebApp files

To build static files for production deployment:

```bash
> cd [project-root-folder]/webapp
> npm run prod
```

View production version of webapp at <http://localhost:9012/>

Upload/deploy the `webapp\dist` folder to your website host of choice.

### Configure website host redirect rules

The build script will indicate for which paths rewrite/redirect rules need to be setup on your server. For instance, the output may indicate:

`from /p/photos/c/:category - to /p/photos/c/_category.html`

Depending on your server's configuration options you have two options:

1) define *rewrite* rules to serve file `/p/photos/c/_category.html` whenever a path starting with `/p/photos/c/` is requested
2) define *redirect* rules to redirect to `p/photos/?category=` whenever a path starting with `p/photos/c/` is requested`

On AWS, this specific redirect rule would look like:

```json
  {
    "Condition": {
      "KeyPrefixEquals": "p/photos/c/"
    },
    "Redirect": {
      "HostName": "[your-host-name-here]",
      "ReplaceKeyPrefixWith": "p/photos/?category="
    }
  },
```

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

### V0.8.0

V0.8.0 is a feature-complete version that has some sub-optimal performance due to the current Gridsome/Webpack design:

- The `app.js` file is bloated with data-uri definitions for every single Grdisome/Webpack-managed image anywhere in the webapp (about 10kB per image).
  - It is essential to keep this `app.js` file as small as possible since its size will to a large extent determine initial load time of the website.
- The default sizes for responsive images are limited and can not be configured.
  - To give browsers more image size choices, more responsive image sizes are desired.
- Responsive images are generated on each build step, negatively impacting the build time, yet the output is always the same.
  - Responsive image generation should happen in a pre-build step.

### V1.1.0

V1.1.0 is a public release with performance enhancements over the current Gridsome/Webpack design:

- Added custom configurable responsive image generator in Strapi CMS, with option to adjust the quality, number and size of responsive image variants per uploaded image.
- The Gridsome build is customized to copy these images to the webapp in the static folder, if and only if they do not exist already.
- This bypasses Gridsome's native responsive image generation on each build step, improving build performance.
- No data-uri's are created for each image, instead a single plain placeholder image is used.

In addition, it uses `Vuex` for state management instead of the message bus implementation in the previous release.

### V1.2.0

- Minor improvements to indieweb tagging.
