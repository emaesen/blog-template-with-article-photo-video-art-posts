<template>
  <div class="app-container">
    <header class="header">
      <g-link to="/" class="nodeco above">
        <g-image alt="logo" src="~/assets/images/logo.png" width="65"/>
      </g-link>
      <SiteNav/>
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

import caniuse from '@/mixins/caniuse'

import { EventBus } from '~/utils/event-bus'

export default {
  name: 'App',
  mixins: [caniuse],
  components: {
    SiteNav,
    Footer,
    AnimatedOpeningScreen,
  },
  data() {
    return {
      disableMotion: false,
    }
  },
  mounted() {
    if (this.disableMotion) {
      this.caniuse.motion = false
    }
  },
  computed: {
  },
  methods: {
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
</style>
