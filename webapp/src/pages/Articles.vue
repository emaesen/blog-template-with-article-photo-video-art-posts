<template>
  <Layout>
    <h1>{{$page.cms.articlesPage.title}}</h1>
    <RichText :data="$page.cms.articlesPage.introduction" class="para"/>
    <div v-if="hasArticles" class="h-feed">
      <div class="cards-container">
        <ArticleCard
          v-for="article in articles"
          :key="article.id"
          :article="article"
        />
      </div>
    </div>

  </Layout>
</template>

<script>
import ArticleCard from '~/components/ArticleCard'
import RichText from '~/components/RichText'
import { getMetaTags } from '~/utils/meta-tags'

export default {
  methods: {
  },
  components: {
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
    nrOfDisplayedArticles() {
      return this.articles.length
    },
    hasArticles() {
      return this.nrOfDisplayedArticles > 0
    },
    totalNrOfArticles() {
      return this.$page.cms.allArticles.length
    },
    showViewAllLink() {
      return this.totalNrOfArticles > this.nrOfDisplayedArticles
    }
  }
}
</script>

<page-query>
query ArticlesPage {
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
    articles(sort: "createdAt:desc") {
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
