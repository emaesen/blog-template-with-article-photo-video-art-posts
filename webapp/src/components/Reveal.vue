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
import caniuse from '@/mixins/caniuse'
import { EventBus } from '~/utils/event-bus'

export default {
  name: 'reveal',
  mixins: [caniuse],
  data() {
    return {
    }
  },
  mounted() {
    if(this.caniuse.motion) {
      this.bladesWrapper.addEventListener('transitionend', this.revealEndCallback);
      EventBus.$on('start-reveal', () => {
        this.reveal()
      })
    }

  },
  computed: {
    bladesWrapper() {
      return this.$refs.bladesWrapper
    }
  },
  methods: {
    reveal() {
      this.bladesWrapper.classList.add('reveal')
    },
    revealEndCallback() {
      this.bladesWrapper.removeEventListener('transitionend', ()=>{})
        this.$emit('reveal-done')
        EventBus.$emit('reveal-done')
    }
  }
}
</script>

<style lang="less" scoped>
.blades-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #ccc;
  opacity: 0.97;
  transition: opacity 2s cubic-bezier(.9,0,.9,.9); 
}
.blade {
  position: absolute;
  top: 50vh;
  left: -50vw;
  transform-origin: top center;
  transition: transform 2s cubic-bezier(.55,.01,.86,1); 
  width: 200vmax;
  height: 200vmax;
  background-color: #cdc;
  opacity: 0.2;
}
.blade-1 {
  transform: rotate(0);
  background-color: #864;
}
.blade-2 {
  transform: rotate(40deg);
  background-color: #766;
}
.blade-3 {
  transform: rotate(80deg);
  background-color: #869;
}
.blade-4 {
  transform: rotate(120deg);
  background-color: #766;
}
.blade-5 {
  transform: rotate(160deg);
  background-color: #667;
}
.blade-6 {
  transform: rotate(200deg);
  background-color: #764;
}
.blade-7 {
  transform: rotate(240deg);
  background-color: #557;
}
.blade-8 {
  transform: rotate(280deg);
  background-color: #657;
}
.blade-9 {
  transform: rotate(320deg);
  background-color: #655;
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