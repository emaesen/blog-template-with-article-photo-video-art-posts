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
      osAnimaClassName: "os_anima",
      animateSignature: true,
    }
  },
  mounted() {
    if(this.caniuse.motion) {
      this.containerClassList.add(this.fillviewportClassName)
      EventBus.$emit('start-animatedsvg')
    } else {
      this.animateSignature = false
      this.placeSignature()
      this.removeRevealContainer()
    }
  },
  computed: {
    containerClassList() {
      return this.$root.$el.classList
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
      this.containerClassList.remove(this.fillviewportClassName)
      this.removeRevealContainer()
      this.placeSignature()
    },
    removeRevealContainer() {
      this.$refs.revealContainer.$el.remove()
    },
    placeSignature() {
      this.$refs.signatureContainer.$el.classList.remove(this.osAnimaClassName)
    }
  },
}
</script>

<style lang="less">
.signature {
  position: absolute;
  top: 0;
  left: 0;
  width: 15vw;
  min-width: 100px;
  transform-origin: top left;
  transform: scale(1) translate(75px,15px);
  transition: transform 2.5s ease;
}
.signature.os_anima {
  transform: scale(3) translate(5vw,5vh);
}

</style>
