<template>
  <svg
    class="icon-arrows"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    @click="toggle"
    :class="{up:isUp, down:!isUp}"
  >
    <g class="arrow arrow-down">
        <path d="M10,50 L90,50 L50,90 L10,50 "/>
    </g>
    <g class="arrow arrow-up">
        <path d="M10,50 L90,50 L50,10 L10,50 "/>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'IconArrowUpDown',
  props: {
    isArrowUp: {
      type: Boolean,
    }
  },
  data() {
    return {
      isUp: false,
    }
  },
  methods: {
    toggle() {
      this.isUp = !this.isUp
    }
  },
  watch: {
    isArrowUp(newVal) {
      this.isUp = newVal
    }
  }
}
</script>

<style lang="less" scoped>
.icon-arrows {
  width: 30px;
  height: 30px;
  padding: 0;
  stroke-width: 9;
}
.icon-arrows:hover {
  cursor: pointer;
}
.arrow {
  stroke: #000;
  fill: #000;
  stroke-linecap: round;
  stroke-linejoin: round;
  transform-origin: 50% 50%;
  transition: all .5s ease-in-out;
  will-change: transform, opacity;
  opacity: 1;
}
.arrow-down {
  transform: translateY(-15px) scaleY(1);
  fill: none;
}
.arrow-up {
  transform: translateY(15px) scaleY(1);
}
.flip .arrow-down,
.up .arrow-down,
.down .arrow-up {
  opacity: 0;
  transform: translateY(0) scaleY(0);
}
.flip .arrow-up {
  opacity: 1;
  transform: translateY(15px) scaleY(1);
}
</style>