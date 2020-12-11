<template>
  <div class="main-article">
    <article>
      <h1>
      <span  @click="goBackOrUp">
        <IconGoBackOrUp :title="goBackOrUpText"/>
      </span>
        {{ article.title }}
      </h1>
      <div class="meta deemph para">
        <div class="date dt-published">
          {{ dateText }}
        </div>
      </div>

      <g-image
        :alt="article.title"
        :src="imgUrl"
      />
      <div class="description para spacious">
        {{ article.description }}
      </div>

      <Content :content="article.content" class="" />

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
import date from '@/mixins/date.js'
import goBackOrUp from '@/mixins/go-back-or-up.js'

export default {
  name: 'Article',
  mixins: [date, goBackOrUp],
  methods: {
    getCmsMedia,
  },
  components: {
    IconGoBackOrUp,
    Content,
  },
  metaInfo() {
    return getMetaTags(this.article) 
  },
  computed: {
    article() {
      return this.$page.cms.articles[0]
    },
    imgUrl() {
      const imgName=this.article.coverImage.url
      return getCmsMedia(imgName)
    },
    dateText() {
      let opts = {shortForm:true, showYear:true};
      let text = this.formattedDate(this.article.createdAt, opts);
      return text;
    },

  }
}
</script>

<style lang="less" scoped>
.description {
  font-style: italic;
}
</style>