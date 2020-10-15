<template>
  <div class="">
    <p class="">{{ data.title }}</p>
    <g-image
      :src="getCmsMedia(data.images[parsedSelectedIndex].url)"
    />
    <div class="">
      <button class="" @click="rawSelectedIndex -= 1">Previous</button>
      <button class="" @click="rawSelectedIndex += 1">Next</button>
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
