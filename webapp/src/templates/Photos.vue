<template>
  <div class="main-photos">
    <h1>{{photosPage.title}}</h1>

    <g-image
      v-if="introImage"
      class="img-postcat"
      alt="photo posts"
      :src="introImage"
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
import { getCmsMedia } from '~/utils/medias'
import { getMetaTags } from '~/utils/meta-tags'

export default {
  name: 'Photos',
  methods: {
  },
  components: {
    PaginatedPosts,
    RichText,
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
      return this.$page.cms.photosPage
    },
    photos() {
      // the maximum nr of photos to show is defined by `limit` in the 
      // graphql query
      return this.$page.cms.photos
    },
    introImage() {
      const img = this.photosPage.seo.shareImage
      return getCmsMedia(img && img.url)
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