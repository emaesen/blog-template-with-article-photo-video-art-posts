<template>
  <Layout>
    <div class="">
      <h1 class="">{{ $page.cms.home.title }}</h1>
      <div class="">
        <RichText :data="{ content: $page.cms.home.bio }" />
      </div>
    </div>

    <!-- List of article preview cards -->
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
  </Layout>
</template>

<page-query>
query IndexPage ($articlesLimit: Int!) {
  cms {
    # Get homepage data
    home {
      title
      # Metadata for SEO
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
    articles(sort: "createdAt:desc" limit:$articlesLimit) {
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
      params: {
      articlesLimit: 1,
      }
    }
  },
  metaInfo() {
    const { title, description, shareImage } = this.$page.cms.home.seo
    const image = getCmsMedia(shareImage.url)
    return {
      title,
      meta: getSeoMetaTags(title, description, image),
    }
  },
  computed: {
    hasArticles() {
      return this.$page.cms.articles.length > 0
    },
    latestArticles() {
      // the maximum nr of articles to show is defined by `limit` in the 
      // graphql query
      return this.$page.cms.articles
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
}

</style>
