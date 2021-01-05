<template>
  <div class="main-videos">
    <h1>{{videosPage.title}}</h1>

    <g-image
      v-if="introImage"
      class="img-postcat"
      alt="videos posts"
      :src="introImage"
    />

    <RichText :data="videosPage.introduction" class="para intro group"/>

    <div class="h-feed">
      <div class="cards-container">
        <PostCard
          v-for="video in videos"
          :key="video.id"
          :post="video"
          postType="video"
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
import PostCard from '~/components/PostCard'
import RichText from '~/components/RichText'
import { getCmsMedia } from '~/utils/medias'
import { getMetaTags } from '~/utils/meta-tags'

export default {
  name: 'Videos',
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
    return getMetaTags(this.videosPage.seo) 
  },
  computed: {
    videosPage() {
      return this.$page.cms.videosPage
    },
    videos() {
      // the maximum nr of videos to show is defined by `limit` in the 
      // graphql query
      console.log({videos:this.$page.cms.videos})
      return this.$page.cms.videos
    },
    introImage() {
      const img = this.videosPage.seo.shareImage
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
    }
  }
}
</script>

<page-query>
query VideosPage ($sort: String!, $start: Int, $limit: Int) {
  cms {
    videosPage {
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

    # List videos
    videos (sort: $sort, limit:$limit, start:$start) {
      id
      title
      slug
      youtubeId
      description
      video {
        id
        url
        mime
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

  }
}
</page-query>

<style lang="less" scoped>
.img-postcat {
  float: right;
  width: 40%;
}
</style>