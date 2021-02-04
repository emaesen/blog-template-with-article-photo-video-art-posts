<template>
  <div class="main-articles">
    <h1>{{articlesPage.title}}</h1>

    <g-image
      v-if="introImage"
      class="img-postcat"
      alt="article posts"
      :src="introImage"
    />

    <RichText :data="articlesPage.introduction" class="para intro group"/>

    <PaginatedPosts
      postType="article"
      :posts="articles"
      :basePath="basePath"
      :currentPage="currentPage"
      :totalPages="totalPages"
    />

  </div>
</template>

<script>
import PaginatedPosts from '~/components/PaginatedPosts'
import RichText from '~/components/RichText'
import { getCmsMedia } from '~/utils/medias'
import { getMetaTags } from '~/utils/meta-tags'

export default {
  name: 'Articles',
  methods: {
  },
  components: {
    PaginatedPosts,
    RichText,
  },
  data() {
    return {
    }
  },
  metaInfo() {
    return getMetaTags(this.articlesPage.seo, this.$route) 
  },
  computed: {
    articlesPage() {
      return this.$page.cms.articlesPage
    },
    articles() {
      // the maximum nr of articles to show is defined by `limit` in the 
      // graphql query
      return this.$page.cms.articles
    },
    introImage() {
      const img = this.articlesPage.seo.shareImage
      return getCmsMedia(img && img.url)
    },
    basePath() {
      return this.$route.path.replace(/\/\d+.*/,"/");
    },
    currentPage() {
      return this.$context.page
    },
    totalPages() {
      return this.$context.totalPages
    },
  }
}
</script>

<page-query>
query ArticlesPage ($sort: String!, $start: Int, $limit: Int) {
  cms {
    articlesPage {
      title
      introduction
      seo {
        title
        description
        shareImage {
          id
          url
        }
      }
    }

    # List articles
    articles (sort: $sort, limit:$limit, start:$start) {

      id
      title
      createdAt
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
      date
      createdAt
      publicationDate

    }

  }
}
</page-query>

<style lang="less" scoped>

</style>