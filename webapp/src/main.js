// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

/* use `require`s if you want to install fonts through fontsource
 * - this makes it easy to switch/test fonts during development
 * - but is inefficient in page-load behavior
 * Alternative: Store files in static folder and define `preload`
 * settings below
 */
/*
require('fontsource-lora')
require('fontsource-goldman')
require('fontsource-eagle-lake')
require('fontsource-marck-script')
require('fontsource-share-tech-mono')
*/

import vuexStore from "~/store.js"

export default function (Vue, { router, head, isClient, appOptions }) {

  appOptions.store = vuexStore

  /***********************************
   * router settings
   ***********************************/
  router.options.scrollBehavior = function(to, from, savedPosition) {
    return new Promise((resolve) => {
      const is404 = to.name==="*"
      setTimeout(() => {
        if (to.hash && !is404) {
          resolve( {
            selector: to.hash,
            behavior: 'smooth'
          } );
        } else if (savedPosition) {
          resolve( savedPosition );
        } else {
          resolve( { x: 0, y: 0 } );
        }
      }, 500)
    })
  }


  /***********************************
   * vue-meta font preload settings
   ***********************************/
  const fonts = ['lora-latin-400-normal.woff2', 'marck-script-latin-400-normal.woff2', 'goldman-latin-400-normal.woff2', 'lora-latin-400-italic.woff2', 'eagle-lake-latin-400-normal.woff2', 'lora-latin-700-normal.woff2', 'share-tech-mono-latin-400-normal.woff2']
  fonts.forEach(font => {
    head.link.push({
      rel: 'preload',
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous',
      href: '/fonts/' + font
    })
  })


  /***********************************
   * vue-meta icon settings
   ***********************************/
  const ICON_PATH = '/images/icons/';

  head.link.push({
    key: 'apple-touch-icon',
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: ICON_PATH + 'apple-touch-icon.png',
  })
  head.link.push({
    key: 'icon',
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: ICON_PATH + 'favicon-32x32.png',
  })
  head.link.push({
    key: 'icon',
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: ICON_PATH + 'favicon-16x16.png',
  })
  head.link.push({
    key: 'manifest',
    rel: 'manifest',
    href: ICON_PATH + 'site.webmanifest',
  })
  head.link.push({
    key: 'mask-icon',
    rel: 'mask-icon',
    href: ICON_PATH + 'safari-pinned-tab.svg',
    color: '#5bbad5',
  })
  head.link.push({
    key: 'shortcut icon',
    rel: 'shortcut icon',
    href: ICON_PATH + 'favicon.ico',
  })
  const icon_metas = {
    "msapplication-TileImage": ICON_PATH + "mstile-144x144.png",
    "msapplication-TileColor": "#603cba",
    "msapplication-config": ICON_PATH + "browserconfig.xml",
    "theme-color": "#000000"
  };
  for (var meta in icon_metas) {
    head.meta.push({
      key: meta,
      name: meta,
      content: icon_metas[meta],
    })
  }
  
  /***********************************
   * misc vue-meta settings
   ***********************************/
  head.htmlAttrs = {
    lang: "en", 
    prefix:"og: http://ogp.me/ns#"
  }

}
