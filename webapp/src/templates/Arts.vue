<template>
  <div class="main-arts">
    <h1>{{artsPage.title}}</h1>

    <ResponsiveImage
      v-if="introImage"
      class="img-postcat"
      alt="arts posts"
      :data="introImage"
      sizes="(min-width: 600px) 120px, 20vw !"
    />

    <RichText :data="artsPage.introduction" class="para intro group"/>

    <PaginatedPosts
      postType="art"
      :posts="arts"
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

import redirections from '@/mixins/redirections.js'

import { getMetaTags } from '~/utils/meta-tags'

export default {
  name: 'Arts',
  mixins: [redirections],
  components: {
    PaginatedPosts,
    RichText,
    ResponsiveImage,
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  metaInfo() {
    return getMetaTags(this.artsPage.seo, this.$route) 
  },
  computed: {
    artsPage() {
      return this.$page.cms.artsPage || {}
    },
    arts() {
      // the maximum nr of arts to show is defined by `limit` in the 
      // graphql query
      return this.$page.cms.arts
    },
    introImage() {
      const img = this.artsPage.seo && this.artsPage.seo.shareImage
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
    }
  }
}
</script>

<page-query>
query ArtsPage ($sort: String!, $start: Int, $limit: Int) {
  cms {
    artsPage {
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

    # List arts
    arts (sort: $sort, limit:$limit, start:$start) {
      id
      title
      slug
      categories {
        id
        title
      }
      series {
        id
        title
      }
      image {
        id
        url
        width
        height
        size
        alternativeText
        formats
      }
      createdAt
      date
    }

  }
}
</page-query>

<style lang="less" scoped>
</style>