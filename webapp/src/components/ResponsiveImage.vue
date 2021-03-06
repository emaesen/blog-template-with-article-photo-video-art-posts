<template>
  <img
    v-lazyload-on-intersection
    :src="placeholderSrc"
    :data-src="imgSrc"
    :alt="altText"
    :data-srcset="srcset"
    :data-sizes="mediaSizes"
    @error="onError"
    :width="imgWidth"
    :height="imgHeightAttValue"
    @load="onLoad"
    :class="imgClass"
  >
</template>

<script>
import lazyloadOnIntersection from '@/mixins/lazyload-on-intersection.js';
import { getCmsMedia } from '@/utils/medias'
import { logMessage, logWarning, logError } from '@/utils/logger.js'

/*
 * Expected json structure for data object:
 (with additional formats -like xlarge- possible as well)
  {
    "url": "/uploads/xxxxx.jpg",
    "width": 1165,
    "alternativeText": "",
    "formats": {
      "thumbnail": {
        "width": 245,
        "height": 156,
        "url": "/uploads/thumbnail_xxxxx.jpg"
      },
      "large": {
        "width": 1000,
        "height": 1000,
        "url": "/uploads/large_xxxxx.jpg"
      },
      "medium": {
        "width": 750,
        "height": 750,
        "url": "/uploads/medium_xxxxx.jpg"
      },
      "small": {
        "width": 500,
        "height": 500,
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
    alt: {
      type: String
    },
    sizes: {
      type: String
    },
  },
  data: () => {
    return {
      hasError: false,
      placeholderImgSrc: process.env.GRIDSOME_PLACEHOLDER_IMG_SRC,
      imgHeightAttValue: null,
      imgClass: "before-load",
    }
  },
  created() {
    // this is for the server-side rendered case:
    // do not use a placeholder image but use the actual image
    // so that search engines and other no-javascript readers see the
    // proper image link
    this.placeholderImgSrc = this.imgSrc
  },
  beforeMount() {
    // temporarily set the image height to reserve space within the DOM.
    // This ensures proper detection by intersection observer because the 
    // placeholder image before load is not the same size as the loaded image.
    this.imgHeightAttValue = this.imgHeight
  },
  mounted() {
    // this lifecycle hook is not called during server-side rendering,
    // but will properly initially use the placeholder image in the 
    // dynamic client-side rendered case.
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
    altText() {
      return this.alt || this.data.alternativeText
    },
    srcset() {
      let srcset = this.src + " " + this.data.width + "w"
      // add alternative image formats
      const imgs = this.imgVariants()
      if (imgs) {
        srcset += ", " + imgs
      }
      return srcset
    },
    imgWidth() {
      return this.data.width
    },
    imgHeight() {
      return this.data.height
    },
    imgSize() {
      return this.data.size
    },
    mediaSizes() {
      const imgWidth = `${this.imgWidth}px`
      let sizes=[]
      let customSizes = this.sizes && this.sizes.trim()
      let useDefault = true
      if (customSizes) {
        // adding "!" to end of custom sizes property will
        // disable output of the default sizes
        useDefault = !customSizes.endsWith('!')
        sizes.push(customSizes.replace(/ *!/, ""))
      }
      if (useDefault) {
        sizes.push(`(max-width: ${imgWidth}) 100vw`)
        sizes.push(imgWidth)
      }
      return sizes.join(', ')
    },
  },
  methods: {
    validateData() {
      const data = this.data
      if (!data) {
        logError('ResponsiveImage - No base image data provided')
      } else {
        if (!data.url) logError('ResponsiveImage - No image url provided', {data})
        if (!data.width) logError('ResponsiveImage - No image width provided for ' + data.url)
        if (!data.size) logError('ResponsiveImage - No image size provided for ' + data.url)
        if (!this.alt && !data.alternativeText) logWarning('ResponsiveImage - No image alternativeText provided for ' + data.url)
        if (!data.formats && data.width > 245) logWarning('ResponsiveImage - No alternative image formats provided for ' + data.url)
      }
    },
    imgVariants() {
      const formats = this.data && this.data.formats
      let imgs = []
      if (formats) {
        for(let [_key,props] of Object.entries(formats)) {
          // exclude variants for which the size is larger than the
          // original's size
          if (props.size < this.imgSize) {
            imgs.push(`${getCmsMedia(props.url)} ${props.width}w`)
          } else {
            logMessage(`ResponsiveImage - Image variant excluded (too large):\n${props.url}\n(${props.size} > ${this.imgSize})`)
          }
        }
      }
      return imgs.join(', ')
    },
    onError(err) {
      this.hasError = true
      logError('ResponsiveImage - could not load image ', {data:this.data, error:err})
    },
    onLoad(evt) {
      const imgSrc = evt.path[0].src || ""
      // remove temporary height value
      this.imgHeightAttValue = null
      if (!!!imgSrc.endsWith(this.placeholderImgSrc)) {
        this.imgClass = "anima__zoom"
      }
    }
  }
}
</script>

<style lang="less" scoped>
.js-yes .before-load {
  opacity: 0
}
</style>