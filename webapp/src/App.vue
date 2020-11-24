<template>
  <div class="app-layout"  ref="pagelayout">
    <header class="header">
      <g-link to="/" class="nodeco">
        <g-image alt="logo" src="~/assets/images/logo.png" width="65"/>
      </g-link>
      <SiteNav/>
    </header>
    <main>
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </main>
    <Footer/>

    <Reveal
      ref="revealContainer"
      class="os_reveal"
      @reveal-done="onRevealDone"
    >
    </Reveal>
    <AnimatedSVG
      ref="signatureContainer"
      v-if="signatureSVG"
      v-html="signatureSVG"
      svgId="signature"
      :animate="animateSignature"
      :class="['os_signature', fillviewportClassName]"
      @animatedsvg-done="onAnimatedSVGDone"
    >
    </AnimatedSVG>

  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
  cms {
    scalarVectorGraphics(where: {valueOfIdAttributeInSvg: "signature"}) {
      code
    }

  }
}
</static-query>

<script>
import SiteNav from '~/components/SiteNav'
import Footer from '~/components/Footer'
import AnimatedSVG from '~/components/AnimatedSVG'
import Reveal from '~/components/Reveal'

import caniuse from '@/mixins/caniuse'

import { EventBus } from '~/utils/event-bus'

export default {
  name: 'App',
  mixins: [caniuse],
  components: {
    SiteNav,
    Footer,
    AnimatedSVG,
    Reveal,
  },
  data() {
    return {
      fillviewportClassName: "fillviewport",
      animateSignature: true,
      disableMotion: false,
    }
  },
  mounted() {
    if (this.disableMotion) {
      this.caniuse.motion = false
    }
    if(this.caniuse.motion) {
      this.pageClassList.add(this.fillviewportClassName)
      EventBus.$emit('start-animatedsvg')
    } else {
      this.animateSignature = false
      this.placeSignature()
      this.removeRevealContainer()
    }
  },
  computed: {
    pageEl() {
      console.log({pagelayout:this.$refs.pagelayout})
      return this.$refs.pagelayout
    },
    pageClassList() {
      return this.pageEl.classList
    },
    signatureSVG() {
      return this.$static.cms.scalarVectorGraphics[0].code
    },
  },
  methods: {
    onAnimatedSVGDone() {
      EventBus.$emit('start-reveal')
    },
    onRevealDone() {
      this.pageClassList.remove(this.fillviewportClassName)
      this.removeRevealContainer()
      this.placeSignature()
    },
    removeRevealContainer() {
      this.$refs.revealContainer.$el.remove()
    },
    placeSignature() {
      this.$refs.signatureContainer.$el.classList.remove(this.fillviewportClassName)
    }
  },
}
</script>

<style lang="less">
@import "~/assets/styles/app.less";

.app-layout.fillviewport {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden scroll;
}
.os_signature {
  position: absolute;
  top: 0;
  left: 0;
  width: 15vw;
  min-width: 100px;
  transform-origin: top left;
  transform: scale(1) translate(75px,15px);
  transition: transform 2.5s ease;
}
.os_signature.fillviewport {
  transform: scale(3) translate(5vw,5vh);
}

</style>
