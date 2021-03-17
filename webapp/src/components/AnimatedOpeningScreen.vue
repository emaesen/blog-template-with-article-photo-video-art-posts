<template>
  <div class="app-opening">

    <Reveal
      ref="revealContainer"
      class="os_reveal nojs-hide"
    >
    </Reveal>

    <AnimatedSVG
      ref="signatureContainer"
      v-if="signatureSVG"
      v-html="signatureSVG"
      svgId="signature"
      :animate="animateSignature"
      class="signature"
    >
    </AnimatedSVG>

    <div class="os_tags os_opaque nojs-hide" ref="tagsContainer">
      <div
        v-for="tag in authorTags"
        :key="tag.name"
        class="os_tag cursive"
      >
        {{ tag.name }}
      </div>
    </div>

  </div>
</template>

<static-query>
query {
  cms {
    scalarVectorGraphics(where: {valueOfIdAttributeInSvg: "signature"}) {
      code
    }
    global {
      author {
        tag {
          name
        }
      }
    }
  }
}
</static-query>

<script>
import AnimatedSVG from '~/components/AnimatedSVG'
import Reveal from '~/components/Reveal'

import { logMessage } from '@/utils/logger.js'

import { mapGetters, mapMutations } from "vuex"

export default {
  name: 'AnimatedOpeningScreen',
  mixins: [],
  components: {
    AnimatedSVG,
    Reveal,
  },
  data() {
    return {
      fillviewportClassName: "fillviewport",
      heightviewportClassName: "heightviewport",
      osAnimaTransClassName: "os_anima_trans",
      osAnimaClassName: "os_anima",
      animateSignature: true,
    }
  },
  mounted() {
    this.tagsContainer.addEventListener('transitionend', this.removeTagsContainer)
    if (this.doAnimate) this.onDoAnimate()
  },
  destroyed() {
    this.tagsContainer.removeEventListener('transitionend', this.removeTagsContainer)
  },
  computed: {
    ...mapGetters(["mAllow", "mOpeningScreen", "mSignatureSVG"]),
    cms() {
      return this.$static.cms
    },
    global() {
      return this.cms.global
    },
    rootElClassList() {
      return this.$root.$el.classList
    },
    signatureSVG() {
      const svg = this.cms.scalarVectorGraphics[0]
      return svg && svg.code
    },
    authorTags() {
      return this.global && this.global.author && this.global.author.tag
    },
    signatureContainer() {
      return this.$refs.signatureContainer.$el
    },
    tagsContainer() {
      return this.$refs.tagsContainer
    },
    doAnimate() {
      return this.mOpeningScreen.doAnimate
    },
    isSVGAnimateDone() {
      return this.mSignatureSVG.isAnimateDone
    },
    isRevealDone() {
      return this.mOpeningScreen.isRevealDone
    },
  },
  methods: {
    ...mapMutations([
      "SET_SIGNATURESVG_DOANIMATE",
      "SET_OPENINGSCREEN_DOREVEAL",
      "SET_OPENINGSCREEN_ISANIMATEDONE"
    ]),
    onDoAnimate() {
      // don't show opening reveal animation if no-or-reduced motion is 
      // requested or if the route leads to a 404 page.
      if( this.mOpeningScreen.allowAnimate && 
          this.mAllow.motion && 
          this.$route.name !== "*" && 
          this.signatureSVG
      ) {
        logMessage("animate opening screen")
        this.rootElClassList.add(this.heightviewportClassName)
        this.animateTags()
        this.signatureContainer.classList.add(this.osAnimaClassName)
        // Trigger layout to set startpoint styles
        this.signatureContainer.getBoundingClientRect()
        this.signatureContainer.classList.add(this.osAnimaTransClassName)
        this.SET_SIGNATURESVG_DOANIMATE(true)
      } else {
        if (!this.mAllow.motion) {
          this.animateSignature = false
        }
        if(this.signatureSVG) {
          this.placeSignature()
          this.SET_SIGNATURESVG_DOANIMATE(true)
        }
        this.removeRevealContainer()
        this.removeTagsContainer()
      }
    },
    animateTags() {
      this.$nextTick(() => {
        // Trigger layout to set startpoint styles for SSR case
        this.tagsContainer.getBoundingClientRect()
        this.tagsContainer.classList.add(this.osAnimaClassName)
        // just in case animation did not run properly, force remove the
        // tags container after 15 seconds
        setTimeout(this.removeTagsContainer, 15 * 1000)
      })
    },
    onIsSVGAnimateDone() {
      if( this.mOpeningScreen.allowAnimate && 
          this.mAllow.motion) {
        this.SET_OPENINGSCREEN_DOREVEAL(true)
       }
    },
    onIsRevealDone() {
      this.rootElClassList.remove(this.heightviewportClassName)
      this.removeRevealContainer()
      this.placeSignature()
      this.SET_OPENINGSCREEN_ISANIMATEDONE(true)
    },
    removeRevealContainer() {
      this.$refs.revealContainer.$el.remove()
    },
    removeTagsContainer() {
      this.tagsContainer.remove()
    },
    placeSignature() {
      this.signatureContainer.classList.remove(this.osAnimaClassName)
    }
  },
  watch: {
    doAnimate(val) {
      if (val) this.onDoAnimate()
    },
    isSVGAnimateDone(val) {
      if (val) this.onIsSVGAnimateDone()
    },
    isRevealDone(val) {
      if (val) this.onIsRevealDone()
    },
  },
}
</script>

<style lang="less">
.app-opening {
  overflow: hidden;
}
.signature {
  position: absolute;
  top: 0;
  width: 18vw;
  min-width: 110px;
  max-width: 180px;
  transform-origin: top left;
  transform: scale(1) translate(75px,7px);
  z-index: 9;
}
.signature.os_anima_trans {
  transition: transform 2.5s ease-in-out;
}
.signature.os_anima {
  transform: scale(2.7) translate(3vw,4vh);
}


.os_tags {
  position: absolute;
  font-size: 3rem;
  bottom: 0;
  left: 0;
  transform-origin: bottom left;
  transform: scale(1) translate(1vw,-6vh);
  transition: transform 9s ease-in-out;
  animation: 9s ease-in-out tags;
  opacity: 0;
  z-index: 2;
}
.os_tags.os_anima {
  transform: scale(.6) translate(90vw,-50vh);
  opacity: 0;
}

@keyframes tags {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 0.3;
  }
  100% {
    opacity: 0;
  }
}

@media all and (max-width: 650px) {
  .js-yes .signature {
    position: fixed;
  }
}
</style>
