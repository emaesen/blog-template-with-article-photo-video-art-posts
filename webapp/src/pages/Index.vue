<template>
  <div class="main-index">

    <h1>{{ $page.cms.home.title }}</h1>

    <div id="author" class="personal h-card vcard">
      <a class="u-url u-uid" rel="author" href="#author"></a>
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

  </div>
</template>

<page-query>
query IndexPage {
  cms {
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

import { getCmsMedia } from '~/utils/medias'
import { getMetaTags } from '~/utils/meta-tags'


export default {
  name: 'Index',
  components: {
    LatestArticles,
    Content,
  },
  data() {
    return {
    }
  },
  metaInfo() {
    return getMetaTags(this.$page.cms.home.seo) 
  },
  computed: {
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
    location() {
      return this.address.city + ", " + this.address.state_province + ", " + this.address.country
    }
  },
}
</script>

<style lang="less" scoped>
.u-uid {
  display: none;
}
.photo {
  width: 20%;
  max-width: 100px;
}
</style>
