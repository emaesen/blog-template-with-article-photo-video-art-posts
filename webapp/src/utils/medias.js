export function getCmsMedia(target) {
  // Check if target is a local path
  if (target.startsWith('/')) {
    // Require asset
    /* in case of a local file, 
     * since the image name is dynamic, 
     * the webpack builder needs to be instructed 
     * which file to include. 
     * The path needs to be hardcoded and as specific 
     * as possible because webpack will try to 
     * include everything in that static path.
     * https://blog.lichter.io/posts/dynamic-images-vue-nuxt/
     */
    return require(`@cmsmedia/${target.replace(/\/.*\//,"")}`)
  }
  // Otherwise return original target (presumably full URL)
  return target
}
