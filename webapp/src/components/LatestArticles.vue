<template>
  <section v-if="hasArticles" class="h-feed">
    <div class="cards-header-container">
      <h2 class="cards-header p-name">
        Latest articles
      </h2>
      <a 
        v-if="showViewAllLink"
        class="append" href="/p/articles/"
      >view all {{ totalNrOfArticles }} articles</a>
    </div>
    <div class="cards-container">
      <PostCard
        v-for="article in latestArticles"
        :key="article.id"
        :post="article"
        postType="article"
      />
    </div>
  </section>
</template>

<static-query>
query LatestArticles($limit: Int = 6) {
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
import PostCard from '~/components/PostCard'
import RichText from '~/components/RichText'
import { getCmsMedia } from '~/utils/medias'
import { getSeoMetaTags } from '~/utils/seo'

export default {
  methods: {
    getCmsMedia,
  },
  components: {
    PostCard,
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
  margin-bottom: 1.5em;
  box-shadow: 0 2px 7px -4px var(--color_border_accent-2);
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
