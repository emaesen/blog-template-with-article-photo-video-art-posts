<template>
  <div class="large-media">
    <g-image
      :alt="data.description"
      :src="getCmsMedia(data.media.url)"
      v-if="data.media.mime.startsWith('image')"
    />

    <video controls v-if="data.media.mime.startsWith('video')">
      <source :src="data.media.url" :type="data.media.mime" />
    </video>

    <div class="caption">{{ data.description }}</div>

  </div>
</template>

<script>
import { getCmsMedia } from '~/utils/medias'

export default {
  name: 'LargeMedia',
  props: ['data'],
  methods: {
    getCmsMedia,
  }
}
</script>

<style lang="less" scoped>
.caption {
  text-align: center;
  font-style: italic;
}
</style>