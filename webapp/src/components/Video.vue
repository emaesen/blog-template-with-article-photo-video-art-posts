<template>
  <div>

    <VideoYouTube v-if="video.youtubeId" :video="video"/>
    <div v-else>
      <g-image
        :alt="video.title"
        :src="imgUrl"
      />
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
      return getCmsMedia(url)
    },
  },
  methods: {
  },

}
</script>