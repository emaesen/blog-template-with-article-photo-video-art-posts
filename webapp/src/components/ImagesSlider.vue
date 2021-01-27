<template>
  <div v-if="hasData">
    <h3 v-if="title">{{ title }}</h3>
    <Carousel :slides="slides" />
  </div>
</template>

<script>
import Carousel from '~/components/Carousel'

export default {
  name: 'ImagesSlider',
  props: ["data"],
  components: {
    Carousel,
  },
  computed: {
    title() {
      return this.data && this.data.title
    },
    slides() {
      const sliderImages = this.data.sliderImages || []
      return sliderImages.map(current => current.slide)
    },
    hasData() {
      return this.title && this.slides && this.slides.length > 0
    },
  }
}
</script>