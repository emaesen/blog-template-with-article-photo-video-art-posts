/* 
 * mixin to support redirection to Category, Series and Thread pages
 * This is in conjunction with (AWS) redirect rules like
    {
      "Condition": {
        "KeyPrefixEquals": "p/articles/c/"
      },
      "Redirect": {
        "ReplaceKeyPrefixWith": "p/articles/?category="
      }
    },
 * in case your host does not support regex in redirect rules (like AWS)
 */

import { logMessage } from '@/utils/logger.js'

export default {
  name: 'mixins/redirections',
  mounted() {
    const path = this.$route && this.$route.path
    const query = this.$route && this.$route.query
    const hasRedirectQuery = query.category || query.series || query.thread || query.slug
    if (path && hasRedirectQuery) {
      let redirectTo = ""
      const safePath = path.endsWith("/") ? path : path + "/"
      if (query.category) redirectTo = safePath + "c/" + query.category
      if (query.series) redirectTo = safePath + "s/" + query.series
      if (query.thread) redirectTo = safePath + "t/" + query.thread
      if (query.slug) redirectTo = safePath + query.slug
      logMessage("redirect from " + this.$route.fullPath + " to " + redirectTo)
      this.$router.push(redirectTo)
    }
  }
}