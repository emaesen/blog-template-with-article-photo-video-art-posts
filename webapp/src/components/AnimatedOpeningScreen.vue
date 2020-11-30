<template>
  <div class="app-opening">

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
      :class="['signature', osAnimaClassName]"
      @animatedsvg-done="onAnimatedSVGDone"
    >
    </AnimatedSVG>

    <div class="os_tags os_opaque" ref="tagsContainer">
      <div
        v-for="tag in authorTags"
        :key="tag.name"
        class="os_tag"
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

import caniuse from '@/mixins/caniuse'

import { EventBus } from '~/utils/event-bus'

export default {
  name: 'AnimatedOpeningScreen',
  mixins: [caniuse],
  components: {
    AnimatedSVG,
    Reveal,
  },
  data() {
    return {
      fillviewportClassName: "fillviewport",
      heightviewportClassName: "heightviewport",
      osAnimaClassName: "os_anima",
      animateSignature: true,
    }
  },
  mounted() {
    // don't show opening animation if no-or-reduced motion is 
    // requested or if the route leads to a 404 page.
    if(this.caniuse.motion && this.$route.name !== "*") {
      this.rootElClassList.add(this.heightviewportClassName)
      this.animateTags()
      EventBus.$emit('start-animatedsvg')
    } else {
      this.animateSignature = false
      this.placeSignature()
      this.removeRevealContainer()
      this.removeTagsContainer()
    }
  },
  computed: {
    rootElClassList() {
      return this.$root.$el.classList
    },
    signatureSVG() {
      return this.$static.cms.scalarVectorGraphics[0].code
    },
    authorTags() {
      return this.$static.cms.global.author.tag
    }
  },
  methods: {
    animateTags() {
      this.$nextTick(() => {
        this.$refs.tagsContainer.classList.add(this.osAnimaClassName)
      })
    },
    onAnimatedSVGDone() {
      EventBus.$emit('start-reveal')
    },
    onRevealDone() {
      this.rootElClassList.remove(this.heightviewportClassName)
      this.removeRevealContainer()
      this.removeTagsContainer()
      this.placeSignature()
    },
    removeRevealContainer() {
      this.$refs.revealContainer.$el.remove()
    },
    removeTagsContainer() {
      this.$refs.tagsContainer.remove()
    },
    placeSignature() {
      this.$refs.signatureContainer.$el.classList.remove(this.osAnimaClassName)
    }
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
  left: 0;
  width: 15vw;
  min-width: 100px;
  transform-origin: top left;
  transform: scale(1) translate(75px,15px);
  transition: transform 2.5s ease-in-out;
}
.signature.os_anima {
  transform: scale(3) translate(5vw,5vh);
}


.os_tags {
  position: absolute;
  font-size: 5rem;
  bottom: 0;
  left: 0;
  transform-origin: bottom left;
  transform: scale(1) translate(9vw,-9vh);
  transition: transform 9s ease-in-out;
  animation: 8s ease-in-out tags;
  opacity: 0;
}
.os_tags.os_anima {
  transform: scale(1.1) translate(10vw,-10vh);
  opacity: 0;
}

@keyframes tags {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}
</style>
