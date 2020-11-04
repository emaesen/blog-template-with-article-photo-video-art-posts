<template>
  <div class="carousel-container">
    <h3 class="">{{ title }}</h3>
    <div 
      class="carousel replacefade-container"
      aria-label="image carousel"
      @mouseover.stop="handleMouseOver" 
      @mouseout.stop="handleMouseOut"
      ref="carousel"
      :id="title.toLowerCase().replace(/ /g, '-')"
    >
      <transition name="replacefade" >
        <div :key="currentImageIndex" >
        <g-image
          :src="getCmsMedia(images[currentImageIndex].url)"
        />
        </div>
      </transition>
      <div class="carousel-controls">
        <button 
          class="carousel-nav"
          @click="goToPrev(), startAutoPlay()"
          aria-label="previous image"
        >‹</button>
        <ul class="carousel-dots">
          <li 
            v-for="n in nrOfImages"
            :key="n"
            class="carousel-dot"
            :class="{'carousel-dot--current': n - 1 === currentImageIndex}"
          >
            <button 
              @click="goTo(n - 1), startAutoPlay()"
              :aria-label="'jump to image ' + n"
            >{{n}}</button>
          </li>
        </ul>
        <button 
          class="carousel-nav"
          @click="goToNext(), startAutoPlay()"
          aria-label="next image"
        >›</button>
      </div>
    </div>
  </div>
</template>

<script>
import mouseHandlers from '@/mixins/mouse-handlers'

import { getCmsMedia } from '~/utils/medias'

export default {
  props: ['data'],
  mixins: [mouseHandlers],
  data: () => ({
    currentImageIndex: 0,
    autoplaySpeed: 9000,
    dragDistance: 0,
    dragThreshold: 50,
    supportsTouch: 'ontouchstart' in window
  }),
  mounted() {
    // Setup - Add mouse and touch event listeners
    this.$refs.carousel.addEventListener(this.supportsTouch ? 'touchstart' : 'mousedown', this.handleMouseDown)
    this.$refs.carousel.addEventListener(this.supportsTouch ? 'touchend' : 'mouseup', this.handleMouseUp)
    this.$refs.carousel.addEventListener(this.supportsTouch ? 'touchmove' : 'mousemove', this.handleMouseMove)

    this.startAutoPlay();
  },
  beforeDestroy () {
    // Cleanup - Remove mouse and touch event listeners
    this.$refs.carousel.removeEventListener(this.supportsTouch ? 'touchstart' : 'mousedown', this.handleMouseDown)
    this.$refs.carousel.removeEventListener(this.supportsTouch ? 'touchend' : 'mouseup', this.handleMouseUp)
    this.$refs.carousel.removeEventListener(this.supportsTouch ? 'touchmove' : 'mousemove', this.handleMouseMove)

    this.stopAutoPlay()
  },
  computed: {
    title() {
      return this.data.title
    },
    images() {
      return this.data.images
    },
    nrOfImages() {
      return this.images.length
    },
  },
  methods: {
    getCmsMedia,
    toggleAutoPlay() {
      if (!this.autoplayInterval) {
        this.autoplayInterval = setInterval(() => {
          if (!document.hidden) {
            this.goToNext()
          }
        }, this.autoplaySpeed)
      } else {
        this.stopAutoPlay()
      }
    },

    startAutoPlay() {
      this.stopAutoPlay()
      this.toggleAutoPlay()
    },

    stopAutoPlay() {
      clearInterval(this.autoplayInterval)
      this.autoplayInterval = null
    },

    goToNext() {
      this.goTo(this.currentImageIndex + 1)
    },

    goToPrev() {
      this.goTo(this.currentImageIndex - 1)
    },

    goTo (n) {
      // don't go beyond first image
      if (n<0) {
        n = this.nrOfImages - 1
      }
      // don't go beyond last image
      this.currentImageIndex = n  % this.nrOfImages;
    },

    handleMouseOver () {
      this.stopAutoPlay()
    },

    handleMouseOut () {
      this.startAutoPlay()
    }   

  },
  watch: {
    dragDistance () {
      if (this.mouseDown) {
        if (this.dragDistance > this.dragThreshold) {
          this.goToPrev()
          this.handleMouseUp()
        }

        if (this.dragDistance < -1 * this.dragThreshold) {
          this.goToNext()
          this.handleMouseUp()
        }
      }
    },
  }
}
</script>

<style lang="less" scoped>

.carousel:focus,
.carousel *:focus,
.carousel *:active {
  outline: none;
}
.carousel-container {
  position: relative;
}
.carousel-controls {
  width: 100%;
  height: 4em;
  position: absolute;
  bottom: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #00000050;
}
.carousel-nav {
  margin: 0;
  cursor: pointer;
  color: #fff;
  background-color: unset;
  box-shadow: unset;
  border: none;
  font-size: 5em;
}


.carousel-dots {
  align-items: center;
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  white-space: nowrap;
}

.carousel-dot {
  margin: 0 10px;
}

@diam:25px;
.carousel-dot button {
  background-color: transparent;
  border: 1px solid #ccc;
  cursor: pointer;
  display: block;
  height: @diam;
  font-size: 0;
  line-height: 0;
  margin: 0;
  padding: 0;
  transition-duration: .3s;
  width: @diam;
  border-radius: @diam/2;
}
.carousel-dot:hover button {
  background-color: #ccccccdd;
}
.carousel-dot--current button {
  background-color: #cccccc99;
  cursor: unset;
}
</style>
