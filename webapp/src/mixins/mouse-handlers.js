/* touch/mouse detection mixin
 * In parent component, `watch` the `dragDistance` changes
 * and take action when the change is more than a pre-defined
 * threshold.
 */

const mixin = {
  name: 'mixins/mouse-handlers',
  data() {
    return {
      mouseDown: false,
      dragStartX: 0,
      dragStartY: 0,
      dragDistance: 0,
      supportsTouch: 'ontouchstart' in window,
      scrollDisabled: false,
    }
  },
  methods: {
    handleMouseDown(e) {
      if (!e.touches) {
        e.preventDefault()
      }
      this.mouseDown = true
      this.dragStartX = this.supportsTouch ? e.touches[0].clientX : e.clientX
      this.dragStartY = this.supportsTouch ? e.touches[0].clientY : e.clientY
    },

    handleMouseMove(e) {
      const positionX = this.supportsTouch ? e.touches[0].clientX : e.clientX
      const positionY = this.supportsTouch ? e.touches[0].clientY : e.clientY
      const dragDistanceX = Math.abs(positionX - this.dragStartX)
      const dragDistanceY = Math.abs(positionY - this.dragStartY)
      if (dragDistanceX > 3 * dragDistanceY) {
        this.disableScroll(e)
        this.dragDistance = positionX - this.dragStartX
      }
    },

    handleMouseUp() {
      this.mouseDown = false
      this.enableScroll()
    },

    disableScroll(e) {
      if (!e.touches) {
        document.ontouchmove = (e) => e.preventDefault()
        this.scrollDisabled = true
      }
    },

    enableScroll() {
      if (this.scrollDisabled) {
        document.ontouchmove = () => true
        this.scrollDisabled = false
      }
    },

  }
}

export default mixin