<template>
  <section v-if="hasArticles">
    <div class="cards-header-container">
      <h2 class="cards-header">
        Latest articles
      </h2>
      <a class="button" href="#">view all</a>
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
    articles(sort: "createdAt:desc" limit:$limit) {
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
    hasArticles() {
      return this.$static.cms.articles.length > 0
    },
    latestArticles() {
      // the maximum nr of articles to show is defined by `limit` in the 
      // graphql query
      return this.$static.cms.articles
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
