<template>
  <Layout>
    <div class="">
      <h1 class="">{{ $page.cms.home.title }}</h1>
      <div class="">
        <Content :content="$page.cms.home.content" />
      </div>

      <!-- Section with latest articles -->
      <LatestArticles/>

    </div>
  </Layout>
</template>

<page-query>
query IndexPage {
  cms {
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
          images {
            id
            url
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
import { getSeoMetaTags } from '~/utils/seo'

export default {
  methods: {
    getCmsMedia,
  },
  components: {
    LatestArticles,
    Content,
  },
  data() {
    return {
      params: {
      }
    }
  },
  metaInfo() {
    const { title, description, shareImage } = this.$page.cms.home.seo
    const image = getCmsMedia(shareImage.url)
    return {
      title,
      meta: getSeoMetaTags(title, description, image),
    }
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>
</style>
