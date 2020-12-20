<template>
  <svg
    class="icon-menu_bars"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    @click="toggle"
    :class="{cross_shape:hasCrossShape}"
  >
    <g>
      <path class="bar bar-top" d="M13,26.5 L88,26.5"/>
      <path class="bar bar-middle-1" d="M13,50.5 L88,50.5"/>
      <path class="bar bar-middle-2" d="M13,50.5 L88,50.5"/>
      <path class="bar bar-bottom" d="M13,74.5 L88,74.5"/>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'IconMenu',
  props: {
    isBarMenuOpen: {
      type: Boolean,
    }
  },
  data() {
    return {
      hasCrossShape: false,
    }
  },
  methods: {
    toggle() {
      this.hasCrossShape = !this.hasCrossShape
    }
  },
  watch: {
    isBarMenuOpen(newVal) {
      this.hasCrossShape = newVal
    }
  }
}
</script>

<style lang="less" scoped>
.icon-menu_bars {
  width: 30px;
  height: 30px;
  padding: 0;
  stroke-width: 9;
}
.icon-menu_bars:hover {
  cursor: pointer;
}
.bar {
  stroke: var(--color_icon);
  stroke-linecap: round;
  stroke-linejoin: round;
  transform-origin: 50% 50%;
  transition: all .5s ease-in-out;
	transform: rotate(0deg);
  transform: scaleX(1);
  will-change: transform, opacity;
  opacity: 1;
}
.cross_shape .bar-top,
.cross_shape .bar-bottom {
  opacity: 0;
  transform: scaleX(0);
}
.cross_shape .bar-middle-1 {
  transform: rotate(45deg);
}
.cross_shape .bar-middle-2 {
  transform: rotate(-45deg);
}
</style>