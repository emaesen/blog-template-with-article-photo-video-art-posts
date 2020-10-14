// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

require('fontsource-quando');
require('fontsource-heebo');

import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)



  /***********************************
   * meta icon settings
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

}
