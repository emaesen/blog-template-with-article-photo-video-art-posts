<template>
  <div>

    <VideoYouTube v-if="video.youtubeId" :video="video"/>
    <div v-else>
      <video 
          class="video" 
          controls playsinline
          preload="metadata"
        >
          <!--source src="xxx.webm" type="video/webm;codecs=vp9" -->
          <source :src="videoUrl" :type="mimeType">
          <ResponsiveImage
            :alt="video.title"
            :data="coverImage"
            sizes="(min-width: 693px) 693px, 100vw !"
          />
        </video>
    </div>
  </div>
</template>

<script>
import VideoYouTube from '~/components/VideoYouTube'
import ResponsiveImage from '~/components/ResponsiveImage'

import { getCmsMedia } from '~/utils/medias'

export default {
  name:"Video",
  props: ['video'],
  components: {
    VideoYouTube,
    ResponsiveImage,
  },
  data() {
    return {
      youtubeId: "",
      videoTitle: "",
      showYoutubeContent: false,
    }
  },
  computed: {
    coverImage() {
      return this.video.coverImage
    },
    imgUrl() {
      const url = this.coverImage && this.coverImage.url
      return getCmsMedia(url)
    },
    videoUrl() {
      const url = this.video.video && this.video.video.url
      return getCmsMedia(url)
    },
    mimeType() {
      return this.video.video && this.video.video.mime
    },
  },
  methods: {
  },

}
</script>

<style lang="less" scoped>
.video {
  width: 100%;
}
</style>