<template>
  <section v-if="hasPhotos" class="h-feed">
    <div class="cards-header-container">
      <h2 class="cards-header p-name">
        Latest photos
      </h2>
      <a 
        v-if="showViewAllLink"
        class="append" href="/p/photos/"
      >view all {{ totalNrOfPhotos }} photos</a>
    </div>
    <div class="cards-container">
      <PostCard
        v-for="photo in latestPhotos"
        :key="photo.id"
        :post="photo"
        postType="photo"
      />
    </div>
  </section>
</template>

<static-query>
query LatestPhotos($limit: Int = 4) {
  cms {
    # List photos
    latestPhotos: photos(sort: "createdAt:desc" limit:$limit) {
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
    }
    allPhotos: photos {
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
    latestPhotos() {
      // the maximum nr of photos to show is defined by `limit` in the 
      // graphql query
      return this.$static.cms.latestPhotos
    },
    nrOfDisplayedPhotos() {
      return this.latestPhotos.length
    },
    hasPhotos() {
      return this.nrOfDisplayedPhotos > 0
    },
    totalNrOfPhotos() {
      return this.$static.cms.allPhotos.length
    },
    showViewAllLink() {
      return this.totalNrOfPhotos > this.nrOfDisplayedPhotos
    }
  }
}
</script>

<style lang="less" scoped>

</style>
