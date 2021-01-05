<template>
  <div>

    <VideoYouTube v-if="video.youtubeId" :video="video"/>
    <div v-else>
      <video 
          class="video" 
          controls playsinline
          preload="metadata"
          :poster="imgUrl"
        >
          <!--source src="xxx.webm" type="video/webm;codecs=vp9" -->
          <source :src="videoUrl" :type="mimeType">
          <g-image
            :alt="video.title"
            :src="imgUrl"
          />
        </video>
    </div>
  </div>
</template>

<script>
import VideoYouTube from '~/components/VideoYouTube'
import { getCmsMedia } from '~/utils/medias'

export default {
  name:"Video",
  props: ['video'],
  components: {
    VideoYouTube,
  },
  data() {
    return {
      youtubeId: "",
      videoTitle: "",
      showYoutubeContent: false,
    }
  },
  computed: {
    imgUrl() {
      const url = this.video.coverImage && this.video.coverImage.url
      return getCmsMedia(url, false)
    },
    videoUrl() {
      const url = this.video.video && this.video.video.url
      return getCmsMedia(url, false)
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