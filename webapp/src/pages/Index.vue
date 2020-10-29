<template>
  <Layout>
    <div class="">
      <h1 class="">{{ $page.cms.home.title }}</h1>
      <div class="">
        <RichText :data="{ content: $page.cms.home.bio }" />
      </div>
      <h2
        class=""
      >
        My latest articles
      </h2>
    </div>
    <!-- List of article preview cards -->
    <div class="">
      <ArticleCard
        v-for="article in $page.cms.articles"
        :key="article.id"
        :article="article"
      />
    </div>
  </Layout>
</template>

<page-query>
query IndexPage {
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
    articles(sort: "date:desc") {
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
  metaInfo() {
    const { title, description, shareImage } = this.$page.cms.home.seo
    const image = getCmsMedia(shareImage.url)
    return {
      title,
      meta: getSeoMetaTags(title, description, image),
    }
  },
}
</script>

<style>
</style>
