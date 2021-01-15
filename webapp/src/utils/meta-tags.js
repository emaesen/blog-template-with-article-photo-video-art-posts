import { getCmsMedia } from './medias'
import { getSeoMetaTags } from './seo'

export function getMetaTags(opts, pagePath) {
  if (opts) {
    const { title, description, shareImage, coverImage } = opts

    const basePath = process.env.GRIDSOME_SITE_URL
    const siteName = process.env.GRIDSOME_SITE_NAME
    const pageUrl = basePath + pagePath

    const image = shareImage && shareImage.url ? shareImage : (coverImage && coverImage.url) ? coverImage : null
    
    let imageUrl = image && image.url ? getCmsMedia(image.url, false) : null
  
    if (imageUrl) {
      imageUrl = basePath + imageUrl
    } else {
      console.log (`no SEO image found for "${title}" page`)
    }

    const metaTags = {
      title,
      meta: getSeoMetaTags(title, description, imageUrl, pageUrl, siteName),
    }
    console.log({metaTags})
    return metaTags
  } else {
    console.warn("No meta tags defined")
    return null
  }
}