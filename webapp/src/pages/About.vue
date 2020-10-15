<template>
  <Layout>
    <Content :content="$page.cms.about.content" class="" />
  </Layout>
</template>

<script>
import Content from '~/components/Content'
import { getCmsMedia } from '~/utils/medias'
import { getSeoMetaTags } from '~/utils/seo'

export default {
  components: {
    Content,
  },
  metaInfo() {
    const { title, description, shareImage } = this.$page.cms.about.seo
    const image = getCmsMedia(shareImage.url)
    return {
      title,
      meta: getSeoMetaTags(title, description, image),
    }
  },
}
</script>

<page-query>
query {
  cms {
    about {
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
      seo {
        title
        description
        shareImage {
          id
          url
        }
      }
    }
  }
}
</page-query>
