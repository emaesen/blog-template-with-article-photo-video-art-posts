<template>
  <div class="carousel-container">
    <h3 class="">{{ data.title }}</h3>
    <div class="carousel replacefade-container">
    <transition name="replacefade" >
      <div :key="parsedSelectedIndex" >
      <g-image
        :src="getCmsMedia(data.images[parsedSelectedIndex].url)"
      />
      </div>
    </transition>
    <div class="carousel-controls">
      <button class="" @click="rawSelectedIndex -= 1">Previous</button>
      <button class="" @click="rawSelectedIndex += 1">Next</button>
    </div>
    </div>
  </div>
</template>

<script>
import { getCmsMedia } from '~/utils/medias'

export default {
  props: ['data'],
  data: () => ({
    rawSelectedIndex: 0,
  }),
  computed: {
    parsedSelectedIndex() {
      // Ensure we don't go beyond the amount of images
      return this.rawSelectedIndex % this.data.images.length
    },
  },
  methods: {
    getCmsMedia,
  },
}
</script>

<style lang="less" scoped>
.carousel-container {
  position: relative;
}
</style>
