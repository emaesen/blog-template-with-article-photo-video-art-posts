<template>
  <div ref="bladesWrapper" class="blades-wrapper">
    <div class="blade blade-1"></div>
    <div class="blade blade-2"></div>
    <div class="blade blade-3"></div>
    <div class="blade blade-4"></div>
    <div class="blade blade-5"></div>
    <div class="blade blade-6"></div>
    <div class="blade blade-7"></div>
    <div class="blade blade-8"></div>
    <div class="blade blade-9"></div>
  </div>
</template>

<script>
import { logMessage } from '@/utils/logger.js'

import { mapGetters, mapMutations } from "vuex"

export default {
  name: 'Reveal',
  mixins: [],
  data() {
    return {
      nrOfAnimatedBlades: 0,
    }
  },
  mounted() {
    this.bladesWrapper.addEventListener('transitionend', this.revealEndCallback)
    if (this.doReveal) this.onDoReveal()
  },
  destroyed() {
    if(this.bladesWrapper) {
      this.bladesWrapper.removeEventListener('transitionend', this.revealEndCallback)
    }
  },
  computed: {
    ...mapGetters(["mAllow", "mOpeningScreen"]),
    bladesWrapper() {
      return this.$refs.bladesWrapper
    },
    doReveal() {
      return this.mOpeningScreen.doReveal
    },
  },
  methods: {
    ...mapMutations([
      "SET_OPENINGSCREEN_ISREVEALDONE"
    ]),
    onDoReveal() {
      logMessage("openingscreen reveal animation initiated")
      this.bladesWrapper.classList.add('reveal')
    },
    revealEndCallback(ev) {
      // because there are multiple blades that are being animated,
      // we need to keep track of the nr of finished events and only
      // act when we reached the final one.
      this.nrOfAnimatedBlades ++
      // 9 blades + wrapper
      if ( this.nrOfAnimatedBlades === 10 ) {
        this.bladesWrapper.removeEventListener('transitionend', this.revealEndCallback)
        logMessage("openingscreen reveal animation finished")
        this.SET_OPENINGSCREEN_ISREVEALDONE(true)
      }
    }
  },
  watch: {
    doReveal(val) {
      if (val) this.onDoReveal()
    }
  }
}
</script>

<style lang="less" scoped>
.blades-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--color_bg);
  opacity: 0.97;
  transition: opacity 2s cubic-bezier(.9,0,.9,.9); 
  z-index: 2;
}
.blade {
  position: absolute;
  top: 50vh;
  left: -100vw;
  transform-origin: top center;
  transition: transform 2s cubic-bezier(.55,.01,.86,1); 
  width: 300vw;
  height: 300vh;
  background-color: var(--color_reveal);
  opacity: 0.2;
}
.blade-1 {
  transform: rotate(0);
}
.blade-2 {
  transform: rotate(40deg);
}
.blade-3 {
  transform: rotate(80deg);
}
.blade-4 {
  transform: rotate(120deg);
}
.blade-5 {
  transform: rotate(160deg);
}
.blade-6 {
  transform: rotate(200deg);
}
.blade-7 {
  transform: rotate(240deg);
}
.blade-8 {
  transform: rotate(280deg);
}
.blade-9 {
  transform: rotate(320deg);
}

.reveal.blades-wrapper {
  opacity: 0;
}
.reveal .blade-1 {
  transform: translate(0, 84vmax) rotate(0);
}
.reveal .blade-2 {
  transform: translate(-55vmax, 65vmax) rotate(40deg);
}
.reveal .blade-3 {
  transform: translate(-83vmax, 14vmax) rotate(80deg);
}
.reveal .blade-4 {
  transform: translate(-73vmax, -42vmax) rotate(120deg);
}
.reveal .blade-5 {
  transform: translate(-29vmax, -78vmax) rotate(160deg);
}
.reveal .blade-6 {
  transform: translate(29vmax, -78vmax) rotate(200deg);
}
.reveal .blade-7 {
  transform: translate(73vmax, -42vmax) rotate(240deg);
}
.reveal .blade-8 {
  transform: translate(83vmax, 14vmax) rotate(280deg);
}
.reveal .blade-9 {
  transform: translate(55vmax, 65vmax) rotate(320deg);
}
</style>