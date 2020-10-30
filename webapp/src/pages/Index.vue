<template>
  <Layout>
    <div class="">
      <h1 class="">{{ $page.cms.home.title }}</h1>
      <div class="">
        <RichText :data="{ content: $page.cms.home.bio }" />
      </div>
    </div>

    <!-- Section with latest articles -->
    <LatestArticles/>

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
import RichText from '~/components/RichText'
import { getCmsMedia } from '~/utils/medias'
import { getSeoMetaTags } from '~/utils/seo'

export default {
  methods: {
    getCmsMedia,
  },
  components: {
    LatestArticles,
    RichText,
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
