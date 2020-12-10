<template>
  <div class="main-article">
    <article>
      <h1>
        <IconGoBackOrUp />
        {{ $page.cms.articles[0].title }}
      </h1>
      <g-image
        :alt="$page.cms.articles[0].title"
        :src="imgUrl"
      />
      <div class="description">
        {{ $page.cms.articles[0].description }}
      </div>

      <Content :content="$page.cms.articles[0].content" class="" />
    </article>
  </div>
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
import IconGoBackOrUp from '~/components/IconGoBackOrUp'
import Content from '~/components/Content'
import { getCmsMedia } from '~/utils/medias'
import { getMetaTags } from '~/utils/meta-tags'

export default {
  name: 'Article',
  methods: {
    getCmsMedia,
  },
  components: {
    IconGoBackOrUp,
    Content,
  },
  metaInfo() {
    return getMetaTags(this.$page.cms.articles[0]) 
  },
  computed: {
    imgUrl() {
      const imgName=this.$page.cms.articles[0].coverImage.url
      return getCmsMedia(imgName)
    }
  }
}
</script>