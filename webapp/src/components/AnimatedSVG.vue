<template>
  <div ref="animatedSvg" class="svg-container temp-hidden">
    <slot></slot>
  </div>
</template>

<script>
import { logMessage } from '@/utils/logger.js'

import { mapGetters, mapMutations } from "vuex"

export default {
  name: 'AnimatedSVG',
  mixins: [],
  props: {
    svgId: {
      type: String
    },
    animate: {
      type: Boolean
    }
  },
  data() {
    return {
      nrOfPaths: 0,
      nrOfAnimatedPaths: 0,
      drawTimeSeconds: 0.4,
    }
  },
  mounted() {
    this.svgEl.addEventListener('transitionend', this.animationEndCallback)
    if (this.doAnimate) this.onDoAnimate()
  },
  destroyed() {
    this.svgEl.removeEventListener('transitionend', this.animationEndCallback)
  },
  computed: {
    ...mapGetters(["mApp", "mAllow", "mSignatureSVG", "mColorScheme"]),
    svgSelector() {
      return "#"+this.svgId
    },
    svgEl() {
      return document.querySelector(this.svgSelector)
    },
    doAnimate() {
      return this.mSignatureSVG.doAnimate
    },
    isAnimateDone() {
      return this.mSignatureSVG.isAnimateDone
    },
    selectedColorMode() {
      return this.mColorScheme.selectedIndex
    },
  },
  methods: {
    ...mapMutations([
      "SET_SIGNATURESVG_ISANIMATEDONE"
    ]),
    onColorSchemeChanged() {
      this.drawTimeSeconds = 0.2
      this.drawSVG(this.svgSelector, {reset:true})
    },
    onDoAnimate() {
      logMessage("animate signature SVG")
      this.drawSVG(this.svgSelector)
    },
    drawSVG(selector, opts) {
      const el = document.querySelector(selector)
      const paths = el.getElementsByTagName("path")
      const pathsArray = Array.from(paths)
      this.nrOfPaths = pathsArray.length
      if(opts && opts.reset) {
        pathsArray.forEach((path, i) => {
          path.style = null
        })
      }
      this.$refs.animatedSvg.classList.remove("temp-hidden")
      pathsArray.forEach((path, i) => {
        if(this.animate) {
          this.drawPath(i, path)
        }
      })
    },
    drawPath(i, el) {
      const strokeDrawTiming = this.drawTimeSeconds + 's'
      const fillDrawTiming = (1.5 * this.drawTimeSeconds) + 's'
      const delay = (0.75 * this.drawTimeSeconds * i) + 's'
      const length = el.getTotalLength()
      // Clear any previous transition
      el.style.transition = 'none'
      // Set startpoint
      el.style.strokeDasharray = length + ' ' + length
      el.style.strokeDashoffset = length
      el.style.fill = 'transparent'
      // Trigger layout to set startpoint styles
      el.getBoundingClientRect()
      // Define transition
      el.style.transition = 'stroke-dashoffset ' + strokeDrawTiming + ' ease-in-out ' + delay + ', fill ' + fillDrawTiming + ' ease-in-out ' + delay
      // Set endpoint to trigger start of animation
      el.style.strokeDashoffset = '0'
      el.style.fill = null
    },
    animationEndCallback(ev) {
      // because there are multiple paths that are being animated,
      // each with two transitions, we need to keep track of the
      // nr of finished events and only act when we reached the final
      // one.
      this.nrOfAnimatedPaths ++
      if (this.nrOfAnimatedPaths === 2 * this.nrOfPaths) {
        this.svgEl.removeEventListener('transitionend', ()=>{})
        this.SET_SIGNATURESVG_ISANIMATEDONE(true)
      }
    },
  },
  watch: {
    doAnimate(val) {
      if (val) this.onDoAnimate()
    },
    selectedColorMode(val) {
      this.onColorSchemeChanged()
    }
  },
}
</script>

<style lang="less">
.svg-container svg {
  stroke-linecap:round;
  stroke-linejoin:round;
  stroke-width:.5;
  stroke: var(--color_icon_stroke);
  fill: var(--color_icon_fill);
}
.js-yes .temp-hidden {
  visibility: hidden;
}
</style>
