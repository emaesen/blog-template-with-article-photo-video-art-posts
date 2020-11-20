<template>
  <div>
    <Layout ref="pagelayout">

      <h1>{{ $page.cms.home.title }}</h1>

      <div class="personal h-card">
        <div class="photo u-photo" v-if="photoUrl">
          <g-image :src="photoUrl" width="100"/>
        </div>
        <div class="name p-name">
          {{ author.name }}
        </div>
        <span
          v-for="tag in author.tag"
          :key="tag.name"
          class="tag"
        >
          {{ tag.name }}
        </span>
        <div class="city">
          {{ author.address.city }}
        </div>
      </div>

      <Content :content="$page.cms.home.content" />

      <!-- Section with latest articles -->
      <LatestArticles/>

    </Layout>

    <div
      v-if="signatureSVG"
      class="os_wrapper"
    >
      <Reveal
        class="os_reveal"
        @reveal-done="onRevealDone"
      >
      </Reveal>
      <AnimatedSVG
        v-html="signatureSVG"
        svgId="signature"
        :class="['os_signature', fillviewportClassName]"
        @animatedsvg-done="onAnimatedSVGDone"
      >
      </AnimatedSVG>
    </div>

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

import { EventBus } from '~/utils/event-bus'
import { getCmsMedia } from '~/utils/medias'
import { getMetaTags } from '~/utils/meta-tags'


export default {
  components: {
    LatestArticles,
    Content,
    AnimatedSVG,
    Reveal,
  },
  data() {
    return {
      fillviewportClassName: "fillviewport"
    }
  },
  metaInfo() {
    return getMetaTags(this.$page.cms.home.seo) 
  },
  mounted() {
    console.log(this.$refs.pagelayout)
    this.pageClassList.add(this.fillviewportClassName)
    EventBus.$emit('start-animatedsvg')
  },
  computed: {
    pageEl() {
      return this.$refs.pagelayout.$el
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
    photoUrl() {
      return getCmsMedia(this.author.photo.url)
    },
    organizations() {
      return this.global.organization
    },
    signatureSVG() {
      return this.$page.cms.scalarVectorGraphics[0].code
    },
  },
  methods: {
    onAnimatedSVGDone() {
      EventBus.$emit('start-reveal')
    },
    onRevealDone() {
      this.pageClassList.remove(this.fillviewportClassName)
    },
  },
}
</script>

<style lang="less" scoped>
.fillviewport {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.os_signature {
  display: flex;
  justify-content: center;
  align-content: center;
}
.photo {
  width: 20%;
  max-width: 100px;
}
</style>
