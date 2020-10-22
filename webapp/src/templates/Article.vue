<template>
  <Layout>
    <div class="">
      <div class="">
        <h1>
          {{ $page.cms.articles[0].title }}
        </h1>
        <p class="">{{ $page.cms.articles[0].description }}</p>
        coverImage.url = {{ $page.cms.articles[0].coverImage.url }}<br>
        imgUrl = {{ imgUrl }}<br>
        <g-image
          alt="$page.cms.articles[0].title"
          :src="imgUrl"
        />
      </div>
    </div>
    <Content :content="$page.cms.articles[0].content" class="" />
  </Layout>
</template>

<page-query>
query ($slug: String!) {
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
