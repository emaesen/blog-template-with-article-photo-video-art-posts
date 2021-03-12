<template>
  <span
    class="action go-back-or-up nojs-hide"
    :title="title"
  >
    <svg
      class="icon-arrow-up-left anima__pendulum"
      @mouseenter.passive="restartAnimation"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
    <g class="arrow">
        <path class="side1" d="M80,80 L90,70 L40,20 L50,10 L10,10 "/>
        <path class="side2" d="M80,80 L70,90 L20,40 L10,50 L10,10 "/>
    </g>
</svg>

  </span>
</template>

<script>

export default {
  name: "IconGoBackOrUp",
  props: {
    title: String
  },
  methods: {
    restartAnimation(ev) {
      const el = ev.target
      el.classList.remove("anima__pendulum")
      // trigger reflow
      el.getBoundingClientRect()
      el.classList.add("anima__pendulum")
    }
  },
 }
</script>

<style lang="less" scoped>
@import '~/assets/styles/anima.less';
.go-back-or-up {
  vertical-align: text-top;
}
.icon-arrow-up-left {
  width: 25px;
  height: 25px;
  padding: 0;
  stroke-width: 9;
  transition: opacity .5s ease-in-out;
  opacity: 0.5;
  animation-duration: 1.8s;
  animation-iteration-count: 1;
}
.icon-arrow-up-left:hover {
  opacity: 1;
}
.arrow {
  stroke: var(--color_icon);
  fill: transparent;
  stroke-linecap: round;
  stroke-linejoin: round;
  transform-origin: 50% 50%;
}

</style>