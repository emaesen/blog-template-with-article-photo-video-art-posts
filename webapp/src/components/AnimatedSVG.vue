<template>
  <div class="svg-container">
    <slot></slot>
  </div>
</template>

<script>
import caniuse from '@/mixins/caniuse'
import { EventBus } from '~/utils/event-bus'

export default {
  name: 'animated-svg',
  mixins: [caniuse],
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
      colorStroke: "#1130ff",
      colorFill: "#1130ffaa",
      nrOfPaths: 0,
      nrOfAnimatedPaths: 0,
      drawTimeSeconds: 0.7,
    }
  },
  mounted() {
    if(this.animate && this.caniuse.motion) {
      this.svgEl.addEventListener('transitionend', this.animationEndCallback);
      EventBus.$on('start-animatedsvg', () => {
        this.drawSVG(this.svgSelector)
      })
    } else {
      this.setStyles(this.svgSelector)
    }
  },
  computed: {
    svgSelector() {
      return "#"+this.svgId
    },
    svgEl() {
      return document.querySelector(this.svgSelector)
    },
  },
  methods: {
    drawSVG(selector) {
      const el = document.querySelector(selector);
      const paths = el.getElementsByTagName("path");
      const pathsArray = Array.from(paths);
      this.nrOfPaths = pathsArray.length;
      pathsArray.forEach((path, i) => {
        this.drawPath(i, path);
      })
    },
    drawPath(i, el) {
      const strokeDrawTiming = this.drawTimeSeconds + 's'
      const fillDrawTiming = (1.5 * this.drawTimeSeconds) + 's'
      const delay = (0.75 * this.drawTimeSeconds * i) + 's'
      const length = el.getTotalLength();
      //console.log({i, el, length})
      // Clear any previous transition
      el.style.transition = 'none';
      // Set startpoint
      el.style.strokeDasharray = length + ' ' + length;
      el.style.strokeDashoffset = length;
      el.style.fill = 'transparent';
      el.style.stroke = this.colorStroke
      // Trigger layout to set startpoint styles
      el.getBoundingClientRect();
      // Define transition
      el.style.transition = 'stroke-dashoffset ' + strokeDrawTiming + ' ease-in-out ' + delay + ', fill ' + fillDrawTiming + ' ease-in-out ' + delay;
      // Set endpoint to trigger start of animation
      el.style.strokeDashoffset = '0';
      el.style.fill = this.colorFill;
    },
    animationEndCallback(ev) {
      // because there are multiple paths that are being animated,
      // each with two transitions, we need to keep track of the
      // nr of finished events and only act when we reached the final
      // one.
      this.nrOfAnimatedPaths ++
      if (this.nrOfAnimatedPaths === 2 * this.nrOfPaths) {
        this.svgEl.removeEventListener('transitionend', ()=>{})
        this.$emit('animatedsvg-done')
        EventBus.$emit('animatedsvg-done')
      }
    },
    setStyles(selector) {
      const el = document.querySelector(selector)
      console.log({el})
      el.style.stroke = this.colorStroke
      el.style.fill = this.colorFill
    }
  }
}
</script>

<style lang="less">
.svg-container svg {
  stroke-linecap:round;
  stroke-linejoin:round;
  stroke-width:.6;
  stroke: #1130ff;
  fill: #1130ffaa;
  filter: drop-shadow(1px 1px 2px #fff);
}

</style>