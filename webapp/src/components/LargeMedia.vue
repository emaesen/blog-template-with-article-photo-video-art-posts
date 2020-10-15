<template>
  <div class="">
    <g-image
      :alt="data.description"
      :src="getCmsMedia(data.media.url)"
      v-if="data.media.mime.startsWith('image')"
    />
    <video controls v-if="data.media.mime.startsWith('video')">
      <source :src="data.media.url" :type="data.media.mime" />
    </video>
    <p class="">{{ data.description }}</p>
  </div>
</template>

<script>
import { getCmsMedia } from '~/utils/medias'

export default {
  props: ['data'],
  methods: {
    getCmsMedia,
  }
}
</script>
