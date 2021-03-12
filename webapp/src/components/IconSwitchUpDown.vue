<template>
  <svg
    class="icon-switch-up-down"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 60"
    :class="{down:isDown, up:!isDown}"
  >
    <g class="ring-outer">
      <line x1="30" y1="10" x2="70" y2="10"/>
      <line x1="70" y1="50" x2="30" y2="50"/>
      <path d="M30,10 A20,20 0 0,0 30,50 "/>
      <path d="M70,50 A20,20 0 0,0 70,10 "/>
    </g>
    <g class="circle-inner">
      <circle cx="30" cy="30" r="18"/>
    </g>
    <g class="arrow-down">
      <line x1="30" y1="20" x2="30" y2="40"/>
      <line x1="35" y1="35" x2="30" y2="40"/>
      <line x1="30" y1="40" x2="25" y2="35"/>
    </g>
    <g class="arrow-up">
      <line x1="70" y1="40" x2="70" y2="20"/>
      <line x1="65" y1="25" x2="70" y2="20"/>
      <line x1="70" y1="20" x2="75" y2="25"/>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'IconSwitchLF',
  props: {
    selected: {
      type: String,
    }
  },
  data() {
    return {
      isDown: false,
    }
  },
  mounted() {
    this.isDown = (this.selected==="down")
  },
  methods: {
  },
  watch: {
    selected(newVal) {
      this.isDown = (newVal==="down")
    }
  }
}
</script>

<style lang="less" scoped>
.icon-switch-up-down {
  width: 3em;
  padding: 0;
  stroke-width: 2;
  stroke-opacity: 1;
  stroke-linecap:round;
  stroke-linejoin:round;
  transition: opacity .3s cubic-bezier(.61,.09,.45,1.11);
  opacity: .8;
}
.icon-switch-up-down:hover {
  cursor: pointer;
  opacity: 1;
}
svg {
  stroke: var(--color_icon);
  fill: none;
  
}
.circle-inner {
  fill: var(--color_icon);
  fill-opacity: .2;
  stroke-width: 3;
  transform-origin: 50% 50%;
  transition: transform 1s cubic-bezier(.61,.09,.45,1.11);
}

.arrow-up, .arrow-down {
  transition: stroke-width 1s .2s cubic-bezier(.61,.09,.45,1.11);
}

svg.up .circle-inner {
  transform: translateX(40px);
}
svg.down .arrow-down,
svg.up .arrow-up {
  stroke-width: 6;
}
svg.down .circle-inner {
  transform: translateX(0px);
}
</style>