<template>
  <svg
    class="icon-light-dark yin-yang"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 220 220"
    :class="{light:isLight, dark:!isLight}"
  >
    <g stroke-width="3.236">
      <circle class="tao" cx="110" cy="110" r="101"/>
      <path class="yang-half" d="M110,210 A50,50 0 1,1 110,110 A50,50 0 0,0 110,10 A100,100 0 0,0 110,210 Z "/>
      <circle class="yin-inner-circle" cx="110" cy="60" r="17.083"/>
      <circle class="yang-inner-circle" cx="110" cy="160" r="17.083"/>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'IconLightDark',
  props: {
    colorMode: {
      type: String,
    }
  },
  data() {
    return {
      isLight: false,
    }
  },
  mounted() {
    this.isLight = (this.colorMode==="light")
  },
  methods: {
    toggle() {
      this.isLight = !this.isLight
    }
  },
  watch: {
    colorMode(newVal) {
      this.isLight = (newVal==="light")
    }
  }
}
</script>

<style lang="less" scoped>
.icon-light-dark {
  width: 30px;
  height: 30px;
  padding: 0;
  stroke-width: 18;
  stroke-opacity: .6;
  stroke-linecap:round;
  stroke-linejoin:round;
  transition: opacity 1s cubic-bezier(.61,.09,.45,1.11);
  opacity: .6;
}
.icon-light-dark:hover {
  cursor: pointer;
  opacity: 1;
}
svg.light.yin-yang {
  stroke: #000;
}
svg.dark.yin-yang {
  stroke: #fff;
}
.tao,
.yin-inner-circle {
  fill: #000;
}
.yang-inner-circle, 
.yang-half {
  fill: #fff;
}
svg.light .yang-inner-circle {
  stroke: #fff;
}
svg.dark .yin-inner-circle {
  stroke: #000;
}

.yang-half,
.yin-inner-circle,
.yang-inner-circle {
  transform-origin: 50% 50%;
  transition: transform 1s cubic-bezier(.61,.09,.45,1.11);
}

svg.light:hover .yin-inner-circle {
  transform: scale(2) translateY(25px);
}
svg.light:hover .yang-inner-circle {
  transform: scale(0.5) translateY(25px);
}
svg.dark:hover .yang-inner-circle {
  transform: rotate(-180deg) scale(2) translateY(-25px);
}
svg.dark:hover .yin-inner-circle {
  transform: rotate(-180deg) scale(0.5) translateY(-25px);
}

svg.dark .yang-half {
  transform: rotate(180deg);
}
svg.dark .yin-inner-circle,
svg.dark .yang-inner-circle {
  transform: rotate(-180deg);
}

</style>