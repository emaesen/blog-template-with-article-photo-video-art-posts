<template>
  <svg
    class="icon-switch-l-f"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 60"
    :class="{latest:isLatest, featured:!isLatest}"
  >
    <g class="ring-outer">
      <line x1="30" y1="10" x2="70" y2="10"/>
      <line x1="70" y1="50" x2="30" y2="50"/>
      <path d="M30,10 A20,20 0 0,0 30,50 "/>
      <path d="M70,50 A20,20 0 0,0 70,10 "/>
    </g>
    <g class="circle-inner">
      <circle cx="50" cy="30" r="18"/>
    </g>
    <g class="text-f">
      <line x1="34" y1="20" x2="26" y2="20"/>
      <line x1="26" y1="20" x2="26" y2="40"/>
      <line x1="26" y1="29" x2="33" y2="29"/>
    </g>
    <g class="text-l">
      <line x1="74" y1="40" x2="66" y2="40"/>
      <line x1="66" y1="40" x2="66" y2="20"/>
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
      isLatest: false,
    }
  },
  mounted() {
    this.isLatest = (this.selected==="latest")
  },
  methods: {
  },
  watch: {
    selected(newVal) {
      this.isLatest = (newVal==="latest")
    }
  }
}
</script>

<style lang="less" scoped>
.icon-switch-l-f {
  width: 3em;
  padding: 0;
  stroke-width: 2;
  stroke-opacity: 1;
  stroke-linecap:round;
  stroke-linejoin:round;
  transition: opacity .3s cubic-bezier(.61,.09,.45,1.11);
  opacity: .8;
}
.icon-switch-l-f:hover {
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

.text-f, .text-l {
  transition: stroke-width 1s .2s cubic-bezier(.61,.09,.45,1.11);
}

svg.featured .circle-inner {
  transform: translateX(-20px);
}
svg.latest .text-l,
svg.featured .text-f {
  stroke-width: 6;
}
svg.latest .circle-inner {
  transform: translateX(20px);
}
</style>