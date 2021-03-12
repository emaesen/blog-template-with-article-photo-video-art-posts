<template>
  <svg
    :class="['icon-range-5', rangeNrClass, rangeLimitClass]"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 220 60"
  >
    <g class="ring-outer">
      <line x1="30" y1="10" x2="190" y2="10"/>
      <line x1="190" y1="50" x2="30" y2="50"/>
      <path d="M30,10 A20,20 0 0,0 30,50 "/>
      <path d="M190,50 A20,20 0 0,0 190,10 "/>
    </g>
    <g class="circle-inner">
      <circle cx="30" cy="30" r="18"/>
    </g>
    <g class="number number-1">
        <line x1="30" y1="20" x2="30" y2="40"/>
    </g>
    <g class="number number-2">
        <line x1="74" y1="40" x2="66" y2="40"/>
        <line x1="66" y1="20" x2="74" y2="20"/>
        <line x1="74" y1="20" x2="74" y2="30"/>
        <line x1="74" y1="30" x2="66" y2="30"/>
        <line x1="66" y1="30" x2="66" y2="40"/>
    </g>
    <g class="number number-3">
        <line x1="114" y1="20" x2="106" y2="20"/>
        <line x1="106" y1="40" x2="114" y2="40"/>
        <line x1="106" y1="30" x2="114" y2="30"/>
        <line x1="114" y1="20" x2="114" y2="40"/>
    </g>
    <g class="number number-4">
        <line x1="146" y1="20" x2="146" y2="30"/>
        <line x1="146" y1="30" x2="154" y2="30"/>
        <line x1="154" y1="40" x2="154" y2="20"/>
    </g>
    <g class="number number-5">
        <line x1="194" y1="20" x2="186" y2="20"/>
        <line x1="186" y1="20" x2="186" y2="30"/>
        <line x1="186" y1="30" x2="194" y2="30"/>
        <line x1="194" y1="30" x2="194" y2="40"/>
        <line x1="194" y1="40" x2="186" y2="40"/>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'IconRange5',
  props: {
    rangeNr: Number,
    maxRangeNr: Number,
  },
  data() {
    return {
      isLatest: false,
    }
  },
  mounted() {
    this.isLatest = (this.selected==="latest")
  },
  computed: {
    rangeNrClass() {
      return "range-nr" + this.rangeNr
    },
    rangeLimitClass() {
      return "range-limit" + this.maxRangeNr
    },
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
.icon-range-5 {
  width: 7.5em;
  padding: 0;
  stroke-width: 2;
  stroke-opacity: 1;
  stroke-linecap:round;
  stroke-linejoin:round;
  transition: opacity .3s cubic-bezier(.61,.09,.45,1.11);
  opacity: .8;
}
.icon-range-5:hover {
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
  transition: transform .2s cubic-bezier(.61,.09,.45,1.11);
}

.number {
  transition: stroke-width .6s .2s cubic-bezier(.61,.09,.45,1.11);
}

svg.range-limit5 {
  &.range-nr2 .circle-inner {
    transform: translateX(40px);
  }
  &.range-nr3 .circle-inner {
    transform: translateX(80px);
  }
  &.range-nr4 .circle-inner {
    transform: translateX(120px);
  }
  &.range-nr5 .circle-inner {
    transform: translateX(160px);
  }
}

svg.range-limit4 {
  .number-2 {
    transform: translateX(14px);
  }
  .number-3 {
    transform: translateX(27px);
  }
  .number-4 {
    transform: translateX(40px);
  }
  .number-5 {
    display: none;
  }
  &.range-nr2 .circle-inner {
    transform: translateX(54px);
  }
  &.range-nr3 .circle-inner {
    transform: translateX(107px);
  }
  &.range-nr4 .circle-inner {
    transform: translateX(160px);
  }
}

svg.range-limit3 {
  .number-2 {
    transform: translateX(40px);
  }
  .number-3 {
    transform: translateX(80px);
  }
  .number-4 {
    display: none;
  }
  .number-5 {
    display: none;
  }
  &.range-nr2 .circle-inner {
    transform: translateX(80px);
  }
  &.range-nr3 .circle-inner {
    transform: translateX(160px);
  }
}

svg.range-nr1 .number-1,
svg.range-nr2 .number-2,
svg.range-nr3 .number-3,
svg.range-nr4 .number-4,
svg.range-nr5 .number-5 {
  stroke-width: 6;
}
</style>