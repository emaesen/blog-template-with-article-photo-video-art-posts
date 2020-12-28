<template>
  <transition-group name="fade" mode="out-in">
    <div
      v-if="playVideo"
      key="video"
      class="video_container"
    >
      <iframe
        :src="videoSrc"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        :title="video.title"
        class="video"
      ></iframe>
    </div>
    <div
      v-else 
      key="cover"
      @click="playVideo=true" 
      class="video_preview"
    >
      <g-image
        alt="Click to view YouTube video"
        title="Click to view YouTube video"
        :src="imgUrl"
      />
      <button class="play_button nodeco" aria-label="Play">
        <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
          <path class="play_button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path>
          <path d="M 45,24 27,14 27,34" fill="#fff"></path>
        </svg>
      </button>
    </div>
  </transition-group>
</template>

<script>
import { getCmsMedia } from '~/utils/medias'

const videoEmbedPath = "https://www.youtube-nocookie.com/embed/";
// https://developers.google.com/youtube/player_parameters
const videoEmbedOptions = "&fs=0"
      + "&playsinline=1"
      + "&rel=0"
      + (typeof window !== 'undefined' ? "&origin=" + window.location.protocol + "//" + window.location.hostname : "");
const videoEmbedQS = "?autoplay=1" 
      + videoEmbedOptions

export default {
  name: 'VideoYouTube',
  props: ['video'],
  data() {
    return {
      playVideo: false,
    }
  },
  computed: {
    youtubeId() {
      return this.video.youtubeId
    },
    videoSrc() {
      return videoEmbedPath + this.youtubeId + videoEmbedQS
    },
    imgUrl() {
      const url = this.video.coverImage && this.video.coverImage.url
      if (url) {
        return getCmsMedia(url)
      } else {
        return 'https://img.youtube.com/vi/' + this.youtubeId + '/hqdefault.jpg'
      }
    },
  },
  methods: {
    getCmsMedia,
  }
}
</script>

<style lang="less" scoped>
.video_preview {
  margin: auto;
  position: relative;
  width: 80%;
  cursor: pointer;
}
.play_button {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 68px;
  height: 48px;
  margin-left: -34px;
  margin-top: -24px;
  outline: 0;
  border: none;
  background-color: rgba(0,0,0,0);
  cursor: pointer;
}
.play_button svg {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
.play_button-bg {
  transition: fill .2s ease-in-out, fill-opacity .2s ease-in-out;
  fill: rgb(96,96,96);
  fill-opacity: .8;
}
.video_preview:hover .play_button-bg {
  fill: rgb(255,0,0);
  fill-opacity: 1;
}
.video_container {
  margin: auto;
  position: relative;
  width: 80%;
  height: 0;
  /* padding = 0.8 (width percentage) x 9/16 (aspect ratio) */
  padding-bottom: 45%;
}
.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>