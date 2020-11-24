<template>
  <div class="main-index" ref="pagelayout">

    <h1>{{ $page.cms.home.title }}</h1>

    <div class="personal h-card vcard">
      <a class="u-url u-uid" rel="author" href=""></a>
      <div class="photo u-photo" v-if="photoUrl">
        <g-image :src="photoUrl" width="100"/>
      </div>
      <div class="name p-name fn">
        {{ author.name }}
      </div>
      <div class="p-role role">
        <span
          v-for="tag in author.tag"
          :key="tag.name"
          class="tag p-category category"
        >
          {{ tag.name }}
        </span>
      </div>
      <div class="city p-location location" :title="location">
        {{ location }}
      </div>
    </div>

    <Content :content="$page.cms.home.content" />

    <!-- Section with latest articles -->
    <LatestArticles/>

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

<page-query>
query IndexPage {
  cms {
    scalarVectorGraphics(where: {valueOfIdAttributeInSvg: "signature"}) {
      code
    }
    # Get global data
    global {
      author {
        name
        photo {
          url
        }
        tag {
          name
        }
        email
        address {
          city
          state_province
          country
        }
      }
      organization {
        name
        website {
          url
          title
        }
      }
    }
    # Get homepage data
    home {
      # Metadata for SEO
      seo {
        title
        description
        shareImage {
          id
          url
        }
      }
      title
      content {
        __typename
        ... on cmsTypes_ComponentSectionsRichText {
          id
          content
        }
        ... on cmsTypes_ComponentSectionsLargeMedia {
          id
          media {
            id
            url
            mime
          }
          description
        }
        ... on cmsTypes_ComponentSectionsImagesSlider {
          id
          title
          sliderImages {
            id
            slide {
              type
              title
              slug
              url
              image {
                name
                url
              }
            }
          }
        }
      }
    }
  }
}
</page-query>

<script>
import LatestArticles from '~/components/LatestArticles'
import Content from '~/components/Content'
import AnimatedSVG from '~/components/AnimatedSVG'
import Reveal from '~/components/Reveal'

import caniuse from '@/mixins/caniuse'

import { EventBus } from '~/utils/event-bus'
import { getCmsMedia } from '~/utils/medias'
import { getMetaTags } from '~/utils/meta-tags'


export default {
  name: 'home',
  mixins: [caniuse],
  components: {
    LatestArticles,
    Content,
    AnimatedSVG,
    Reveal,
  },
  data() {
    return {
      fillviewportClassName: "fillviewport",
      animateSignature: true,
    }
  },
  metaInfo() {
    return getMetaTags(this.$page.cms.home.seo) 
  },
  mounted() {
    console.log({"location": document.location})
    console.log({"URL": document.URL})
    console.log({"referrer": document.referrer})
    const internalReferrer = document.referrer.startsWith(document.URL)
    if(!internalReferrer && this.caniuse.motion) {
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
    global() {
      return this.$page.cms.global
    },
    author() {
      return this.global.author
    },
    address() {
      return this.author.address
    },
    photoUrl() {
      return getCmsMedia(this.author.photo.url)
    },
    organizations() {
      return this.global.organization
    },
    signatureSVG() {
      return this.$page.cms.scalarVectorGraphics[0].code
    },
    location() {
      return this.address.city + ", " + this.address.state_province + ", " + this.address.country
    }
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

<style lang="less" scoped>
.layout.fillviewport {
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
.photo {
  width: 20%;
  max-width: 100px;
}
</style>
