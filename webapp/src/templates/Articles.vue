<template>
  <div class="main-articles">
    <h1>{{articlesPage.title}}</h1>

    <g-image
      v-if="introImage"
      class="img-postcat"
      alt="articles posts"
      :src="introImage"
    />

    <RichText :data="articlesPage.introduction" class="para intro group"/>

    <div class="h-feed">
      <div class="cards-container">
        <PostCard
          v-for="article in articles"
          :key="article.id"
          :post="article"
          postType="article"
        />
      </div>
    </div>
    <Pagination 
      :basePath="basePath"
      :currentPage="currentPage"
      :totalPages="totalPages"
    />

  </div>
</template>

<script>
import Pagination from '~/components/Pagination'
import PostCard from '~/components/PostCard'
import RichText from '~/components/RichText'
import { getCmsMedia } from '~/utils/medias'
import { getMetaTags } from '~/utils/meta-tags'

export default {
  name: 'Articles',
  methods: {
  },
  components: {
    Pagination,
    PostCard,
    RichText,
  },
  data() {
    return {
    }
  },
  metaInfo() {
    return getMetaTags(this.articlesPage.seo) 
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
    }
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