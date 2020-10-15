export function getCmsMedia(url) {
  // Check if URL is a local path
  if (url.startsWith('/')) {
    // Prepend Cms address
    const cmsUrl = process.env.GRIDSOME_CMS_URL
    return cmsUrl + url
  }
  // Otherwise return full URL
  return url
}
