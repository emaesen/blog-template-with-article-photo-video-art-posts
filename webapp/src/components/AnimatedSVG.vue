<template>
  <div class="svg-container">
    <slot></slot>
  </div>
</template>

<script>
import caniuse from '@/mixins/caniuse'

export default {
  name: 'animated-svg',
  mixins: [caniuse],
  props: {
    svgId: {
      type: String
    },
  },
  data() {
    return {
      colorStroke: "#314cf9",
      colorFill: "#314cf9aa",
      nrOfPaths: 0,
      nrOfAnimatedPaths: 0,
    }
  },
  mounted() {
    if(this.caniuse.motion) {
      this.svgEl.addEventListener('transitionend', this.animationEndCallback);
      this.drawSVG(this.svgSelector, this.colorFill)
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
    drawSVG(selector, color) {
      const el = document.querySelector(selector);
      const paths = el.getElementsByTagName("path");
      const pathsArray = Array.from(paths);
      this.nrOfPaths = pathsArray.length;
      pathsArray.forEach((path, i) => {
        this.drawPath(i, path, color);
      })
    },
    drawPath(i, el, color) {
      const delay = i + "s";
      const length = el.getTotalLength();
      //console.log({i, el, length})
      // Clear any previous transition
      el.style.transition = 'none';
      // Set startpoint
      el.style.strokeDasharray = length + ' ' + length;
      el.style.strokeDashoffset = length;
      el.style.fill = 'transparent';
      // Trigger layout to set startpoint styles
      el.getBoundingClientRect();
      // Define transition
      el.style.transition = 'stroke-dashoffset 3s ease-in-out ' + delay + ', fill 5s ease-in-out ' + delay;
      // Set endpoint to trigger start of animation
      el.style.strokeDashoffset = '0';
      el.style.fill = color;
    },
    animationEndCallback(ev) {
      // because there are multiple paths that are being animated,
      // each with two transitions, we need to keep track of the
      // nr of finished events and only act when we reached the final
      // one.
      this.nrOfAnimatedPaths ++
      if (this.nrOfAnimatedPaths === 2 * this.nrOfPaths) {
        this.svgEl.removeEventListener('transitionend', ()=>{});
        console.log("final animation end", {ev})
      }
    }
  }
}
</script>

<style lang="less">
.svg-container svg {
  width: 500px;
  stroke-linecap:round;
  stroke-linejoin:round;
  stroke-width:.4;
  stroke: #314cf9;
  fill: #314cf9aa;
}

</style>