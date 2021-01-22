/* mixin for general "caniuse" properties */

export default {
  name: 'mixins/caniuse',
  data () {
    return {
      caniuse: {
        motion: false
      },
    }
  },
  mounted: function () {
    const matchReducedMotion = window.matchMedia("prefers-reduced-motion: reduce") || null

    this.caniuse.motion = !(matchReducedMotion && matchReducedMotion.matches)
  }
}