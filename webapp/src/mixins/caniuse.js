const matchReducedMotion = window.matchMedia("prefers-reduced-motion: reduce") || null

export default {
  name: 'mixins/caniuse',
  data () {
    return {
      caniuse: {
        motion: !(matchReducedMotion && matchReducedMotion.matches)
      },
    }
  }
}