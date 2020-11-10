import { getCmsMedia } from './medias'
import { getSeoMetaTags } from './seo'

export function getMetaTags(opts) {
  const { title, description, shareImage, coverImage } = opts

  const image = shareImage && shareImage.url ? shareImage : (coverImage && coverImage.url) ? coverImage : null
  
  const imageUrl = image && image.url ? getCmsMedia(image.url, false) : null

  if (!imageUrl) {
    console.warn (`no SEO image found for "${title}" page!`)
  }
  const metaTags = {
    title,
    meta: getSeoMetaTags(title, description, imageUrl),
  }
  console.log({metaTags})
  return metaTags
}