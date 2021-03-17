<template>
  <div :class="['app-container', motionClass, scriptClass]">
    <header class="header">
      <g-link to="/" class="nodeco above logo" rel="author" v-if="logoImg">
        <ResponsiveImage
          class="u-logo"
          alt="logo"
          :data="logoImg"
          sizes="65px !"
          width="65"
        />
      </g-link>
      <SiteNav/>

      <div class="color-mode-toggle-container nojs-hide">
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
  metadata {
    version
    buildAt
  }
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

import { logMessage } from '@/utils/logger.js'

import { mapGetters, mapMutations } from "vuex"

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
      scriptClass: 'js-no',
      openingAnimationShown: false
    }
  },
  beforeMount() {
    this.scriptClass = 'js-yes'
  },
  mounted() {
    this.init()
  },
  metaInfo () {
    return {
      htmlAttrs: {
        lang: 'en',
        "data-color-mode": this.colorMode
      },
      meta: [
        { name: 'spa-build-version', content: this.metaData.version },
        { name: 'spa-build-date', content: this.metaData.buildAt }
      ]
    }
  },
  computed: {
    ...mapGetters(["mAllow", "mColorScheme", "mOpeningScreen"]),
    metaData() {
      return this.$static.metadata
    },
    global() {
      return this.$static.cms.global
    },
    colorModeIndex() {
      return this.mColorScheme.selectedIndex
    },
    colorMode() {
      return this.mColorScheme.modes[this.colorModeIndex]
    },
    logoImg() {
      const logo = this.global && this.global.siteLogo
      return logo
    },
    motionClass() {
      return this.mAllow.motion ? "motion-yes" : "motion-no" 
    },
    isAnimateDone() {
      return this.mOpeningScreen.isAnimateDone
    },
  },
  methods: {
    ...mapMutations([
      "SET_APP_ISINITDONE",
      "SET_ALLOW_MOTION",
      "SET_COLORSCHEME_INDEX",
      "SET_OPENINGSCREEN_ALLOWANIMATE",
      "SET_OPENINGSCREEN_DOANIMATE",
      "SET_SIGNATURESVG_DOANIMATE",
    ]),
    init() {
      this.SET_ALLOW_MOTION(this.caniuse.motion && !this.disableMotion)
//      this.$nextTick(() => {
        this.initColorMode()
        this.initOpeningAnimation()
        this.$nextTick(() => {
          this.SET_APP_ISINITDONE(true)
        })
//      })
    },
    initOpeningAnimation() {
      this.SET_OPENINGSCREEN_DOANIMATE(true)
    },
    initColorMode() {
      if (window.matchMedia && !this.mColorScheme.hasUserPreference) {
        // get the OS colormode preference unless user had toggled the mode
        this.setColorModeToOSDefault()
        window.matchMedia("(prefers-color-scheme: dark)").onchange = this.setColorModeToOSDefault
      }
      // force metaInfo to update on hydration
      const colorModeIndex = this.colorModeIndex
      if (colorModeIndex !== this.mColorScheme.defaultIndex) {
        this.setColorModeIndex(colorModeIndex + 1)
        this.setColorModeIndex(colorModeIndex)
      }
    },
    setColorModeIndex(val) {
      const maxIndex = this.mColorScheme.modes.length - 1
      val = val || Math.abs(val) || this.mColorScheme.defaultIndex
      const selectedIndex = (val > maxIndex ? 0 : val)
      this.SET_COLORSCHEME_INDEX(selectedIndex)
    },
    toggleColorMode() {
      this.setColorModeIndex(this.colorModeIndex + 1)
    },
    setColorModeToOSDefault() {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        this.setColorModeIndex(this.mColorScheme.modes.indexOf('dark'))
        logMessage("operation system prefers dark color scheme")
      } else {
        this.setColorModeIndex(this.mColorScheme.modes.indexOf('light'))
        logMessage("operation system prefers light color scheme")
      }
    }
  },
  watch: {
    isAnimateDone() {
      logMessage("opening animation has finished - disable subsequent reveals")
      this.SET_OPENINGSCREEN_ALLOWANIMATE(false)
    }
  },
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
