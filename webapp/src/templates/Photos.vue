<template>
  <div class="main-photos">
    <h1>{{photosPage.title}}</h1>

    <ResponsiveImage
      v-if="introImage"
      class="img-postcat"
      alt="photo posts"
      :data="introImage"
      sizes="(min-width: 600px) 120px, 20vw !"
    />

    <RichText :data="photosPage.introduction" class="para intro group"/>

    <PaginatedPosts
      postType="photo"
      :posts="photos"
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
  name: 'Photos',
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
    return getMetaTags(this.photosPage.seo, this.$route) 
  },
  computed: {
    photosPage() {
      return this.$page.cms.photosPage || {}
    },
    photos() {
      // the maximum nr of photos to show is defined by `limit` in the 
      // graphql query
      return this.$page.cms.photos
    },
    introImage() {
      const img = this.photosPage.seo && this.photosPage.seo.shareImage
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
query PhotosPage ($sort: String!, $start: Int, $limit: Int) {
  cms {
    photosPage {
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

    # List photos
    photos (sort: $sort, limit:$limit, start:$start) {
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
      photo {
        id
        url
        width
        height
        size
        alternativeText
        formats
      }
      date
      location {
        landmark
        city
        state_province
        country
      }
      createdAt
    }

  }
}
</page-query>

<style lang="less" scoped>
</style>