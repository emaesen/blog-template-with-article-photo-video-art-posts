<template>
  <div class="main-articles">
    <h1>{{articlesPage.title}}</h1>

    <ResponsiveImage
      v-if="introImage"
      class="img-postcat"
      alt="article posts"
      :data="introImage"
      sizes="(min-width: 600px) 120px, 20vw !"
    />

    <RichText :data="articlesPage.introduction" class="para intro group"/>

    <PaginatedPosts
      postType="article"
      :posts="articles"
      :basePath="basePath"
      :subPath="subPath"
      :currentPage="currentPage"
      :totalPages="totalPages"
    />

  </div>
</template>

<script>
import PaginatedPosts from '~/components/PaginatedPosts'
import RichText from '~/components/RichText'
import ResponsiveImage from '~/components/ResponsiveImage'

import { getMetaTags } from '~/utils/meta-tags'

export default {
  name: 'Articles',
  methods: {
  },
  components: {
    PaginatedPosts,
    RichText,
    ResponsiveImage,
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
      return this.$page.cms.articlesPage || {}
    },
    articles() {
      // the maximum nr of articles to show is defined by `limit` in the 
      // graphql query
      return this.$page.cms.articles
    },
    introImage() {
      const img = this.articlesPage.seo && this.articlesPage.seo.shareImage
      return img
    },
    basePath() {
      return this.$context.basePath;
    },
    subPath() {
      return this.$context.subPath;
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
          width
          height
          size
          alternativeText
          formats
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
        width
        height
        size
        alternativeText
        formats
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