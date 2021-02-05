<template>
  <div class="main-videos">
    <h1>{{videosPage.title}}</h1>

    <g-image
      v-if="introImage"
      class="img-postcat"
      alt="video posts"
      :src="introImage"
    />

    <RichText :data="videosPage.introduction" class="para intro group"/>

    <PaginatedPosts
      postType="video"
      :posts="videos"
      :basePath="basePath"
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
  name: 'Videos',
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
    return getMetaTags(this.videosPage.seo, this.$route) 
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
      byline
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
      createdAt
    }

  }
}
</page-query>

<style lang="less" scoped>

</style>