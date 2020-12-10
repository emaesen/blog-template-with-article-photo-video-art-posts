/* mixin for photo, article, video and note pages.
 * `goBackOrUp` is to be attached to the click handler
 * of a back/up navigational button.
 * If the page was arrived at through some posts list elsewhere 
 * on the webapp, the `goBackOrUp` function will take the visitor
 * back there (with scroll position restored).
 * If the page was arrived at through a bookmark or direct entry
 * in the browser, the `goBackOrUp` function will take the visitor
 * to the main entry page for the current page's type (photos,
 * articles, videos or notes page)
 */

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from.matched.length > 0 && from.path
    })
  },
  methods: {
    goBackOrUp() {
      const currentRoutePath = this.$router.currentRoute.fullPath
      if(this.prevRoute) {
        // if we came from elsewhere in the webapp, go back there...
        this.$router.go(-1)
      } else {
        // ... else go one level up
        const oneLevelUpPath = currentRoutePath.replace(/[^/]+\/?$/,"")
        this.$router.push({path: oneLevelUpPath})
      }
    }
  }
}

