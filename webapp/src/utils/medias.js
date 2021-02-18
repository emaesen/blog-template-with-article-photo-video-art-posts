export function getCmsMedia(target, isGImage=true) {
  // Check if target is a local path
  if (target && target.startsWith('/')) {
    //
    /* Require asset in case of a local file;
     * since the image name is dynamic, 
     * the webpack builder has no access to the file name at build time
     * and needs to be instructed which file to include.
     * 
     * Below approach uses the solution proposed in
     * https://github.com/gridsome/gridsome/issues/292#issuecomment-583692119
     * 
     * The problem with this approach is that webpack now generates
     * base64 encoded strings for *every* resource in the media folder.
     * For an image-heavy webapp this will bloat the size of app.js!!!
     * https://github.com/gridsome/gridsome/issues/292#issuecomment-484264671
     * https://github.com/edm00se/netlify-plugin-gridsome-cache/issues/3#issuecomment-780817472
     * As of 2021/02/18 there does not seem to be a solution for this
     * problem. Either we use g-image and get responsive images but a
     * bloated app.js or we do not use g-image for dynamic images.
     */
    if (isGImage) {
      // to be used in <g-image> case (=default)
      // depends on chainWebpack config in gridsome.config.js
      return require(`!!assets-loader!@${process.env.GRIDSOME_CMS_MEDIA_ALIAS}/${target.replace(/\/.*\//,"")}`)
    } else {
      // to be used in regular <img> or <video> case
      return require(`@${process.env.GRIDSOME_CMS_MEDIA_ALIAS}/${target.replace(/\/.*\//,"")}`)
    }
  }
  // Otherwise return original target (presumably full URL)
  return target
}
