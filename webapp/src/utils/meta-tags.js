import { getCmsMedia } from './medias'
import { getSeoMetaTags } from './seo'

import { logMessage, logWarning } from '@/utils/logger.js'

export function getMetaTags(opts, pageRoute) {
  if (opts) {
    const { title, description, shareImage, coverImage, photo } = opts
    const pagePath = pageRoute && pageRoute.path || ""
    const basePath = process.env.GRIDSOME_SITE_URL
    const siteName = process.env.GRIDSOME_SITE_NAME
    const pageUrl = basePath + pagePath

    const image = shareImage && shareImage.url ? shareImage : (coverImage && coverImage.url) ? coverImage :  (photo && photo.url) ? photo : null
    
    let imageUrl = image && image.url ? getCmsMedia(image.url, false) : null
  
    if (imageUrl) {
      imageUrl = basePath + imageUrl
    } else {
      logMessage(`no SEO image found for "${title}" page`)
    }

    const metaTags = {
      title,
      meta: getSeoMetaTags(title, description, imageUrl, pageUrl, siteName),
      link: [
        { key: 'canonical', rel: 'canonical', href: pageUrl}
      ]
    }
    logMessage(`meta tags for "${title}" page: `, metaTags)
    return metaTags
  } else {
    logWarning("No meta tags defined ", {opts,pageRoute})
    return null
  }
}