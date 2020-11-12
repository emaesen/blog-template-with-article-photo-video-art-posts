<template>
  <Layout>
    <h1>{{$page.cms.articlesPage.title}}</h1>

    <RichText :data="$page.cms.articlesPage.introduction" class="para"/>

    <div class="h-feed">
      <div class="cards-container">
        <ArticleCard
          v-for="article in articles"
          :key="article.id"
          :article="article"
        />
      </div>
    </div>
    <Pagination 
      :basePath="basePath"
      :currentPage="currentPage"
      :totalPages="totalPages"
    />

  </Layout>
</template>

<script>
import Pagination from '~/components/Pagination'
import ArticleCard from '~/components/ArticleCard'
import RichText from '~/components/RichText'
import { getMetaTags } from '~/utils/meta-tags'

export default {
  methods: {
  },
  components: {
    Pagination,
    ArticleCard,
    RichText,
  },
  data() {
    return {
    }
  },
  metaInfo() {
    return getMetaTags(this.$page.cms.articlesPage.seo) 
  },
  computed: {
    articles() {
      // the maximum nr of articles to show is defined by `limit` in the 
      // graphql query
      return this.$page.cms.articles
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

    }

  }
}
</page-query>
