export function getCmsMedia(target, isGImage=true) {
  // Check if target is a local path
  if (target && target.startsWith('/')) {
    // Require asset
    /* in case of a local file, 
     * since the image name is dynamic, 
     * the webpack builder needs to be instructed 
     * which file to include. 
     * Use solution proposed in
     * https://github.com/gridsome/gridsome/issues/292#issuecomment-583692119
     */
    if (isGImage) {
      // to be used in <g-image> case
      return require(`!!assets-loader!@${process.env.GRIDSOME_CMS_MEDIA_ALIAS}/${target.replace(/\/.*\//,"")}`)
    } else {
      // to be used in regular <img> case
      return require(`@${process.env.GRIDSOME_CMS_MEDIA_ALIAS}/${target.replace(/\/.*\//,"")}`)
    }
  }
  // Otherwise return original target (presumably full URL)
  return target
}
