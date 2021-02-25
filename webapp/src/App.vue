<template>
  <div :class="['app-container', motionClass]">
    <header class="header">
      <g-link to="/" class="nodeco above logo" v-if="logoImg">
        <ResponsiveImage
          class="u-logo"
          alt="logo"
          :data="logoImg"
          sizes="65px !"
          width="65"
        />
      </g-link>
      <SiteNav/>

      <div class="color-mode-toggle-container">
        <div
          @click="toggleColorMode"
          class="color-mode-toggle"
          title="toggle light or dark mode"
        >
          <IconLightDark :colorMode="colorMode" />
        </div>
      </div>
    </header>
    <main>
      <transition name="fade" mode="out-in" appear>
        <router-view/>
      </transition>
    </main>
    <Footer/>

    <AnimatedOpeningScreen class="os"/>

  </div>
</template>

<static-query>
query {
  cms {
    global {
      siteName
      siteLogo {
        id
        url
        width
        height
        size
        alternativeText
        formats
      }
    }
  }
}
</static-query>

<script>
import SiteNav from '~/components/SiteNav'
import Footer from '~/components/Footer'
import AnimatedOpeningScreen from '~/components/AnimatedOpeningScreen'
import IconLightDark from '~/components/IconLightDark'
import ResponsiveImage from '~/components/ResponsiveImage'

import caniuse from '@/mixins/caniuse'

import { EventBus } from '~/utils/event-bus'
import {
  persistColorModeIndex,
  retrieveColorModeIndex,
  clearColorModeIndex
} from "~/utils/persistence.js";

export default {
  name: 'App',
  mixins: [caniuse],
  components: {
    SiteNav,
    Footer,
    AnimatedOpeningScreen,
    IconLightDark,
    ResponsiveImage,
  },
  data() {
    return {
      disableMotion: false,
      colorModes: ['light','dark'],
      colorModeIndexDefault: 0,
      colorModeIndex: 0,
      isAppInit: false,
    }
  },
  mounted() {
    if (this.disableMotion) {
      this.caniuse.motion = false
    }
    this.init()
  },
  metaInfo () {
    return {
      htmlAttrs: {
        lang: 'en',
        "data-color-mode": this.colorMode,
      }
    }
  },
  computed: {
    global() {
      return this.$static.cms.global
    },
    colorMode() {
      return this.colorModes[this.colorModeIndex]
    },
    logoImg() {
      const logo = this.global && this.global.siteLogo
      return logo
    },
    motionClass() {
      return this.caniuse.motion ? "motion-yes" : "motion-no" 
    },
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.initColorMode()
        EventBus.$emit('start-animated-opening-screen')
      })
    },
    initColorMode() {
      this.isAppInit = true
      if (window.matchMedia) {
        this.setColorModeToOSDefault()
        window.matchMedia("(prefers-color-scheme: dark)").onchange = this.setColorModeToOSDefault
      }
      // override OS colormode preference if colormode was set in app
      this.setColorModeIndex(retrieveColorModeIndex(this.colorModeIndex))
      this.$nextTick(() => {
        this.isAppInit = false
      })
    },
    setColorModeIndex(val) {
      const maxIndex = this.colorModes.length - 1
      val = val || Math.abs(val) || this.colorModeIndexDefault
      this.colorModeIndex = (val > maxIndex ? 0 : val)
    },
    toggleColorMode() {
      this.setColorModeIndex(this.colorModeIndex + 1)
      if (this.colorModeIndex !== this.colorModeIndexDefault) {
        persistColorModeIndex(this.colorModeIndex)
      } else {
        clearColorModeIndex()
      }
    },
    setColorModeToOSDefault() {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        this.colorModeIndex = 1
      } else {
        this.colorModeIndex = 0
      }
    }
  },
  watch: {
    colorModeIndex() {
      EventBus.$emit('color-scheme-changed', {isAppInit:this.isAppInit})
    }
  }
}
</script>

<style lang="less">
@import "~/assets/styles/app.less";
.logo {
  z-index: 9;
  position: fixed;
  top:0;
  margin-left:-10px;
  max-width: 65px;
}
.os {
  z-index: 99999999;
}
.color-mode-toggle-container {
  width: 100%;
  text-align: right;
  position: relative;
  top: 50px;
}
.color-mode-toggle {
  display: inline-block;
}
/*
@media all and (min-width: 650px) {
  .logo {
    border-bottom-right-radius: 15px;
    box-shadow: 2px 2px 7px -3px var(--color_border_accent-1);
    background-color: var(--color_bg);
    opacity: 0.9;
  }
}
*/
</style>
