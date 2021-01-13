<template>
  <section v-if="hasArts" class="h-feed">
    <div class="cards-header-container">
      <h2 class="cards-header p-name">
        Latest art
      </h2>
      <a 
        v-if="showViewAllLink"
        class="append" href="/p/arts/"
      >view all {{ totalNrOfArts }} art works</a>
    </div>
    <div class="cards-container">
      <PostCard
        v-for="art in latestArts"
        :key="art.id"
        :post="art"
        postType="art"
      />
    </div>
  </section>
</template>

<static-query>
query LatestArts($limit: Int = 4) {
  cms {
    # List arts
    latestArts: arts(sort: "createdAt:desc" limit:$limit) {
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
      }
      createdAt
      date
    }
    artsCount
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
    latestArts() {
      // the maximum nr of arts to show is defined by `limit` in the 
      // graphql query
      return this.$static.cms.latestArts
    },
    nrOfDisplayedArts() {
      return this.latestArts.length
    },
    hasArts() {
      return this.nrOfDisplayedArts > 0
    },
    totalNrOfArts() {
      return this.$static.cms.artsCount
    },
    showViewAllLink() {
      return this.totalNrOfArts > this.nrOfDisplayedArts
    }
  }
}
</script>

<style lang="less" scoped>

</style>
