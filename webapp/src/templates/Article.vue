<template>
  <Layout>
    <h1>
      {{ $page.cms.articles[0].title }}
    </h1>

    <g-image
      :alt="$page.cms.articles[0].title"
      :src="imgUrl"
    />
    <caption>{{ $page.cms.articles[0].description }}</caption>

    <Content :content="$page.cms.articles[0].content" class="" />
  </Layout>
</template>

<page-query>
query Article ($slug: String!) {
  cms {
    articles(where: { slug: $slug }) {
      id
      title
      slug
      description
      categories {
        id
        title
      }
      coverImage {
        id
        url
      }
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
import Content from '~/components/Content'
import { getCmsMedia } from '~/utils/medias'
import { getSeoMetaTags } from '~/utils/seo'

export default {
  methods: {
    getCmsMedia,
  },
  components: {
    Content,
  },
  metaInfo() {
    const { title, description, coverImage } = this.$page.cms.articles[0]
    const image = getCmsMedia(coverImage.url)
    return {
      title,
      meta: getSeoMetaTags(title, description, image),
    }
  },
  computed: {
    imgUrl() {
      const imgName=this.$page.cms.articles[0].coverImage.url
      return getCmsMedia(imgName)
    }
  }
}
</script>