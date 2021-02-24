<template>
  <div class="large-media">
    <ResponsiveImage
      :alt="data.description"
      :data="media"
      v-if="media.mime.startsWith('image')"
    />

    <video controls v-if="media.mime.startsWith('video')">
      <source :src="media.url" :type="media.mime" />
    </video>

    <div class="caption">{{ data.description }}</div>

  </div>
</template>

<script>
import ResponsiveImage from '~/components/ResponsiveImage'

export default {
  name: 'LargeMedia',
  props: ['data'],
  components: {
    ResponsiveImage,
  },
  computed: {
    media() {
      return this.data.media
    },
  },
}
</script>

<style lang="less" scoped>
.caption {
  text-align: center;
  font-style: italic;
}
</style>