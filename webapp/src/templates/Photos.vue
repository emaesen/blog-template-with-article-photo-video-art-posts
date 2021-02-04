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


    <transition name="fade" mode="out-in" appear>
      <div :key="'page' + currentPage">
        <div id="top" class="page-counter">
          {{ pageCounterText }}
        </div>
        <div :class="'h-feed page' + currentPage">
          <div class="cards-container">
            <PostCard
              v-for="photo in photos"
              :key="photo.id"
              :post="photo"
              postType="photo"
            />
          </div>
        </div>
        <div id="top" class="page-counter">
          {{ pageCounterText }}
        </div>
      </div>
    </transition>

    <Pagination 
      :basePath="basePath"
      :currentPage="currentPage"
      :totalPages="totalPages"
      hash="#top"
    />

  </div>
</template>

<script>
import Pagination from '~/components/Pagination'
import PostCard from '~/components/PostCard'
import RichText from '~/components/RichText'
import { getCmsMedia } from '~/utils/medias'
import { getMetaTags } from '~/utils/meta-tags'

export default {
  name: 'Photos',
  methods: {
  },
  components: {
    Pagination,
    PostCard,
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
    return getMetaTags(this.photosPage.seo, this.$route) 
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
      const img = this.photosPage.seo.shareImage
      return getCmsMedia(img && img.url)
    },
    basePath() {
      return this.$route.path.replace(/\/\d+.*/,"/");
    },
    currentPage() {
      return this.$context.page
    },
    totalPages() {
      return this.$context.totalPages
    },
    pageCounterText() {
      return "Page " + (1 + this.currentPage) + " of " + this.totalPages
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