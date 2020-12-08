<template>
  <div class="main-photos">
    <h1>{{photosPage.title}}</h1>

    <g-image
      class="img-postcat"
      alt="photos posts"
      :src="introImage"
    />

    <RichText :data="photosPage.introduction" class="para intro"/>

    <div class="h-feed">
      <div class="cards-container">
        <PhotoCard
          v-for="photo in photos"
          :key="photo.id"
          :photo="photo"
        />
      </div>
    </div>
    <Pagination 
      :basePath="basePath"
      :currentPage="currentPage"
      :totalPages="totalPages"
    />

  </div>
</template>

<script>
import Pagination from '~/components/Pagination'
import PhotoCard from '~/components/PhotoCard'
import RichText from '~/components/RichText'
import { getCmsMedia } from '~/utils/medias'
import { getMetaTags } from '~/utils/meta-tags'

export default {
  methods: {
  },
  components: {
    Pagination,
    PhotoCard,
    RichText,
  },
  data() {
    return {
    }
  },
  mounted() {
    console.log(this.$context)
  },
  metaInfo() {
    return getMetaTags(this.photosPage.seo) 
  },
  computed: {
    photosPage() {
      return this.$page.cms.photosPage
    },
    photos() {
      // the maximum nr of photos to show is defined by `limit` in the 
      // graphql query
      console.log({photos:this.$page.cms.photos})
      return this.$page.cms.photos
    },
    introImage() {
      return getCmsMedia(this.photosPage.seo.shareImage.url)
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
      description
      categories {
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
    }

  }
}
</page-query>

<style lang="less" scoped>
.img-postcat {
  float: right;
  width: 40%;
}
</style>