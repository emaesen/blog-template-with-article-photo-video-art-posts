import { getCmsMedia } from './medias'
import { getSeoMetaTags } from './seo'

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
      console.log (`no SEO image found for "${title}" page`)
    }

    const metaTags = {
      title,
      meta: getSeoMetaTags(title, description, imageUrl, pageUrl, siteName),
      link: [
        { key: 'canonical', rel: 'canonical', href: pageUrl}
      ]
    }
    console.log({metaTags})
    return metaTags
  } else {
    console.warn("No meta tags defined")
    return null
  }
}