<template>
  <div class="resp-img">
    <img v-lazyload-on-intersection
      :src="placeholderSrc"
      :data-src="imgSrc"
      :alt="alt"
      :class="imageClass"
      :data-srcset="srcset"
      :data-sizes="sizes"
      @error="onError"
    >
  </div>
</template>

<script>
import lazyloadOnIntersection from '@/mixins/lazyload-on-intersection.js';
import { getCmsMedia } from '~/utils/medias'

/*
 * Expected json structure for data object:
  {
    "url": "/uploads/xxxxx.jpg",
    "width": 1165,
    "alternativeText": "",
    "formats": {
      "thumbnail": {
        "width": 245,
        "url": "/uploads/thumbnail_xxxxx.jpg"
      },
      "large": {
        "width": 1000,
        "url": "/uploads/large_xxxxx.jpg"
      },
      "medium": {
        "width": 750,
        "url": "/uploads/medium_xxxxx.jpg"
      },
      "small": {
        "width": 500,
        "url": "/uploads/small_xxxxx.jpg"
      }
    }
 */
export default {
  name: 'ResponsiveImage',
  mixins: [lazyloadOnIntersection],
  props: {
    data: {
      type: Object,
      required: true
    },
    viewSizes: {
      type: String
    },
    imageClass: {
      type: String,
      default: ''
    },
  },
  data: () => {
    return {
      hasError: false,
      imgSizes: [
        1165,
        1000,
        750,
        500,
        245,
        156
      ],
      defaultWidth: 1165,
      placeholderImgSrc: process.env.GRIDSOME_PLACEHOLDER_IMG_SRC
    }
  },
  mounted() {
    this.placeholderImgSrc = process.env.GRIDSOME_PLACEHOLDER_IMG_SRC
    this.validateData()
  },
  computed: {
    src() {
      return getCmsMedia(this.data.url)
    },
    placeholderSrc() {
      return this.placeholderImgSrc
    },
    imgSrc() {
      return this.src
    },
    alt() {
      return this.data.alternativeText
    },
    srcset() {
      let srcset = this.src + " " + this.data.width + "w"
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // TODO!!! ADD alternative image formats !!!!!!!!!!!!!
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      return srcset
    },
    sizes() {
      const imgWidth = `${this.data.width}px`
      let sizes=[]
      if (this.viewSizes) sizes.push(this.viewSizes)
      sizes.push(`(max-width: ${imgWidth}) 100vw`)
      sizes.push(imgWidth)
      return sizes.join(', ')
    },
  },
  methods: {
    validateData() {
      const data = this.data
      if (!data) {
        console.err('No base image data provided')
      } else {
        if (!data.url) console.err('No image url provided', {data})
        if (!data.width) console.err('No image width provided', {data})
        if (!data.alternativeText) console.log('No image alternativeText provided for ' + data.url)
        if (!data.formats && data.width > 245) console.log('No alternative image formats provided for ' + data.url)
      }
    },
    onError(err) {
      this.hasError = true
      console.log('could not load image ', {err})
    },
  }
}
</script>

<style lang="less" scoped>

</style>