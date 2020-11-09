import { getCmsMedia } from './medias'
import { getSeoMetaTags } from './seo'

export function getMetaTags(seo) {
  const { title, description, shareImage } = seo
  const image = shareImage && shareImage.url ? getCmsMedia(shareImage.url) : null
  if (!image) {
    console.warn (`no SEO image found for "${title}" page!`)
  }
  const metaTags = {
    title,
    meta: getSeoMetaTags(title, description, image),
  }
  console.log({metaTags})
  return metaTags
}