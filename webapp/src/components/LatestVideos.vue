<template>
  <section v-if="hasVideos" class="h-feed">
    <div class="cards-header-container">
      <h2 class="cards-header p-name">
        Latest videos
      </h2>
      <a 
        v-if="showViewAllLink"
        class="append" href="/p/videos/"
      >view all {{ totalNrOfVideos }} videos</a>
    </div>
    <div class="cards-container">
      <PostCard
        v-for="video in latestVideos"
        :key="video.id"
        :post="video"
        postType="video"
      />
    </div>
  </section>
</template>

<static-query>
query LatestVideos($limit: Int = 4) {
  cms {
    # List videos
    latestVideos: videos(sort: "createdAt:desc" limit:$limit) {
      id
      title
      slug
      youtubeId
      description
      video {
        id
        url
      }
      coverImage {
        id
        url
      }
      date
      categories {
        id
        title
      }
      series {
        id
        title
      }
      publicationDate
    }
    allVideos: videos {
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
    latestVideos() {
      // the maximum nr of videos to show is defined by `limit` in the 
      // graphql query
      return this.$static.cms.latestVideos
    },
    nrOfDisplayedVideos() {
      return this.latestVideos.length
    },
    hasVideos() {
      return this.nrOfDisplayedVideos > 0
    },
    totalNrOfVideos() {
      return this.$static.cms.allVideos.length
    },
    showViewAllLink() {
      return this.totalNrOfVideos > this.nrOfDisplayedVideos
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
