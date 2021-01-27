<template>
  <div 
    class="carousel-container"
    v-if="hasSlides"
  >
    <div 
      class="carousel replacefade-container"
      aria-label="slide carousel"
      @mouseover.stop="handleMouseOver" 
      @mouseout.stop="handleMouseOut"
      ref="carousel"
    >
      <transition name="replacefade" >
        <div :key="currentSlideIndex" class="slide">
          <a :href="slide.url" class="nodeco">
            <!-- ToDo: support other slide types -->
            <g-image
              :src="getCmsMedia(slide.image.url)"
            />
          </a>
          <div class="slide-title">{{ slide.title }}</div>
        </div>
      </transition>
      <div class="carousel-controls">
        <button 
          class="carousel-nav"
          @click="goToPrev(), startAutoPlay()"
          aria-label="previous slide"
        >‹</button>
        <ul class="carousel-dots">
          <li 
            v-for="n in nrOfSlides"
            :key="n"
            class="carousel-dot"
            :class="{'carousel-dot--current': n - 1 === currentSlideIndex, 'carousel-paused': isPaused}"
          >
            <button 
              @click="goTo(n - 1), startAutoPlay()"
              :aria-label="'jump to slide ' + n"
            >{{n}}</button>
          </li>
        </ul>
        <button 
          class="carousel-nav"
          @click="goToNext(), startAutoPlay()"
          aria-label="next slide"
        >›</button>
      </div>
      <div class="progress" ref="progress"></div>
    </div>
  </div>
</template>

<script>
import mouseHandlers from '@/mixins/mouse-handlers'

import { getCmsMedia } from '~/utils/medias'

export default {
  name: 'Carousel',
  props: ['slides'],
  mixins: [mouseHandlers],
  data: () => ({
    currentSlideIndex: 0,
    secondsPerSlide: 9,
    isPaused: false,
    dragDistance: 0,
    dragThreshold: 50,
    supportsTouch: 'ontouchstart' in window
  }),
  mounted() {
    // Setup - Add mouse and touch event listeners
    if (this.hasSlides) {
      this.$refs.carousel.addEventListener(this.supportsTouch ? 'touchstart' : 'mousedown', this.handleMouseDown)
      this.$refs.carousel.addEventListener(this.supportsTouch ? 'touchend' : 'mouseup', this.handleMouseUp)
      this.$refs.carousel.addEventListener(this.supportsTouch ? 'touchmove' : 'mousemove', this.handleMouseMove)

      this.startAutoPlay();
    }
  },
  beforeDestroy () {
    // Cleanup - Remove mouse and touch event listeners
    if (this.hasSlides) {
      this.$refs.carousel.removeEventListener(this.supportsTouch ? 'touchstart' : 'mousedown', this.handleMouseDown)
      this.$refs.carousel.removeEventListener(this.supportsTouch ? 'touchend' : 'mouseup', this.handleMouseUp)
      this.$refs.carousel.removeEventListener(this.supportsTouch ? 'touchmove' : 'mousemove', this.handleMouseMove)

      this.stopAutoPlay()
    }
  },
  computed: {
    autoplaySpeed() {
      return this.secondsPerSlide * 1000
    },
    nrOfSlides() {
      return this.slides.length
    },
    hasSlides() {
      return this.slides && this.nrOfSlides > 0
    },
    slide() {
      return this.slides[this.currentSlideIndex]
    }
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
      this.isPaused = false
      this.startProgress()
    },
    stopAutoPlay() {
      clearInterval(this.autoplayInterval)
      this.autoplayInterval = null
      this.isPaused = true
      this.stopProgress()
    },
    goToNext() {
      this.goTo(this.currentSlideIndex + 1)
    },
    goToPrev() {
      this.goTo(this.currentSlideIndex - 1)
    },
    goTo (n) {
      // don't go beyond first slide
      if (n<0) {
        n = this.nrOfSlides - 1
      }
      // don't go beyond last slide
      this.currentSlideIndex = n  % this.nrOfSlides;
    },

    handleMouseOver () {
      this.stopAutoPlay()
    },
    handleMouseOut () {
      this.startAutoPlay()
    },

    startProgress() {
      let progress = 0;
      const duration = this.secondsPerSlide;
      const nrOfNodes = duration + 1;
      const progressEl = this.$refs.progress;
      progressEl.setAttribute("style", "width:0%");
      this.progressInterval = setInterval(() => {
        progress = progress > duration - 1 ? 0 : progress+1
        progressEl.setAttribute("style", "width:" + progress * ( 100/duration) + "%");
      }, this.autoplaySpeed / nrOfNodes)
    },
    stopProgress() {
      clearInterval(this.progressInterval)
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

@diam:20px;
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
  box-shadow: none;
}
.carousel-dot:hover button {
  background-color: #ccccccdd;
}
.carousel-dot--current button {
  background-color: #cccccc99;
  cursor: unset;
}
.carousel-dot--current.carousel-paused button {
  background-color: #eeccccdd;
}
.slide-title {
  position: absolute;
  top: 0.1em;
  right: 0.1em;
  color: #fff;
  font-size: 2em;
  line-height: 1em;
  opacity: .8;
  text-shadow: 2px 2px 10px #000;
  opacity:.1;
  transition-duration: 1s;
  backdrop-filter: blur(4px);
}
.slide:hover .slide-title,
.slide.replacefade-enter-active .slide-title {
  opacity:1;
}

/* animated progress bar */
.progress {
  position: absolute;
  bottom: 5px;
  transition: width .5s ease;
  height: 4px;
  background-color: #ccccccbb;
  min-width: 1px;
}

@media (prefers-reduced-motion: reduce) {
  .progress {
    display: none;
  }
}
</style>
