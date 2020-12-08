<template>
  <div class="app-container">
    <header class="header">
      <g-link to="/" class="nodeco above">
        <g-image alt="logo" src="~/assets/images/logo.png" width="65"/>
      </g-link>
      <SiteNav/>

      <div @click="toggleColorMode" class="color-mode-toggle">
        <IconLightDark :colorMode="colorMode" />
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
  metadata {
    siteName
  }
}
</static-query>

<script>
import SiteNav from '~/components/SiteNav'
import Footer from '~/components/Footer'
import AnimatedOpeningScreen from '~/components/AnimatedOpeningScreen'
import IconLightDark from '~/components/IconLightDark'

import caniuse from '@/mixins/caniuse'

import { EventBus } from '~/utils/event-bus'

export default {
  name: 'App',
  mixins: [caniuse],
  components: {
    SiteNav,
    Footer,
    AnimatedOpeningScreen,
    IconLightDark,
  },
  data() {
    return {
      disableMotion: false,
      colorModes: ['light','dark'],
      colorModeIndex: 0,
    }
  },
  mounted() {
    if (this.disableMotion) {
      this.caniuse.motion = false
    }
    if (window.matchMedia) {
      this.setColorModeToOSDefault()
      window.matchMedia("(prefers-color-scheme: dark)").onchange = this.setColorModeToOSDefault
    }
    
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
    colorMode() {
      return this.colorModes[this.colorModeIndex]
    },
  },
  methods: {
    toggleColorMode() {
      const maxIndex = this.colorModes.length - 1
      const index = this.colorModeIndex
      this.colorModeIndex = (index === maxIndex ? 0 : index + 1)
    },
    setColorModeToOSDefault() {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        this.colorModeIndex = 1
      } else {
        this.colorModeIndex = 0
      }
    }
  },
}
</script>

<style lang="less">
@import "~/assets/styles/app.less";
.above {
  z-index: 9;
  position: fixed;
}
.os {
  z-index: 99999999;
}
.color-mode-toggle {
  width: 100%;
  text-align: right;
  position: relative;
  top: 50px;
}
</style>
