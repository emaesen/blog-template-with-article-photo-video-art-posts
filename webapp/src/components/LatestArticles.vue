<template>
  <section v-if="hasArticles" class="h-feed">
    <div class="cards-header-container">
      <h2 class="cards-header p-name">
        Latest articles
      </h2>
      <a 
        v-if="showViewAllLink"
        class="button" href="#"
      >view all {{ totalNrOfArticles }} articles</a>
    </div>
    <div class="cards-container">
      <ArticleCard
        v-for="article in latestArticles"
        :key="article.id"
        :article="article"
      />
    </div>
  </section>
</template>

<static-query>
query LatestArticles($limit: Int = 4) {
  cms {
    # List articles
    latestArticles: articles(sort: "createdAt:desc" limit:$limit) {
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
    allArticles: articles {
    	slug
    }
  }
}
</static-query>

<script>
import ArticleCard from '~/components/ArticleCard'
import RichText from '~/components/RichText'
import { getCmsMedia } from '~/utils/medias'
import { getSeoMetaTags } from '~/utils/seo'

export default {
  methods: {
    getCmsMedia,
  },
  components: {
    ArticleCard,
    RichText,
  },
  data() {
    return {
    }
  },
  computed: {
    latestArticles() {
      // the maximum nr of articles to show is defined by `limit` in the 
      // graphql query
      return this.$static.cms.latestArticles
    },
    nrOfDisplayedArticles() {
      return this.latestArticles.length
    },
    hasArticles() {
      return this.nrOfDisplayedArticles > 0
    },
    totalNrOfArticles() {
      return this.$static.cms.allArticles.length
    },
    showViewAllLink() {
      return this.totalNrOfArticles > this.nrOfDisplayedArticles
    }
  }
}
</script>

<style lang="less" scoped>
.cards-header-container {
  border-bottom: 1px solid #0f5ca0;
  margin-bottom: 1.5em;
}
.cards-header {
  display: inline-block;
  margin-bottom: 0;
}
.cards-container {
  display: flex;
  flex-wrap: wrap;
  place-content: space-between;
}

</style>
