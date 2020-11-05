<template>
  <Carousel :data="carouselData" />
</template>

<script>
import Carousel from '~/components/Carousel'

export default {
  props: ["data"],
  components: {
    Carousel,
  },
  computed: {
    carouselData() {
      const sourceData = this.data
      let data = {
        title: sourceData.title
      }
      console.log(sourceData)
      data.images = sourceData.linkImages.map(current => {
        let image = {}
        console.log({current}) 
        return image
      })

      console.log({data})
      return sourceData
    }
  }
}
</script>