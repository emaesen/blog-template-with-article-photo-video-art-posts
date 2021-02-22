export function getCmsMedia(target) {
  // Check if target is a local path
  if (target && target.startsWith('/')) {
    let path = process.env.GRIDSOME_CMS_MEDIA_PATH.replace(/^\/static/, "")
    return `${path}/${target.replace(/\/.*\//,"")}`
  }
  // Otherwise return original target (presumably full URL)
  return target
}
