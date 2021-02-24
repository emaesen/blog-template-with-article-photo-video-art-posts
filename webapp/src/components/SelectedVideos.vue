<template>
  <SelectedPosts
    :latestPosts="latestPosts"
    :featuredPosts="featuredPosts"
    :totalNrOfPosts="totalNrOfPosts"
    :postType="postType"
    :postsType="postsType"
    :postDisplayName="postDisplayName"
    :postsDisplayName="postsDisplayName"
  />
</template>

<static-query>
query LatestVideos($limit: Int = 4) {
  cms {
    # List videos
    latestVideos: videos(sort: "createdAt:desc" limit:$limit) {
      id
      title
      byline
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
        width
        height
        alternativeText
        formats
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
      createdAt
      publicationDate
    }
    videosCount
    featuredPost {
      videos(sort: "createdAt:desc") {
        id
        title
        byline
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
          width
          height
          alternativeText
          formats
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
        createdAt
        publicationDate
      }
    }
  }
}
</static-query>

<script>
import SelectedPosts from '~/components/SelectedPosts'

export default {
  name: 'SelectedVideos',
  methods: {
  },
  components: {
    SelectedPosts,
  },
  data() {
    return {
      postType: "video",
      postsType: "videos",
      postDisplayName: "video",
      postsDisplayName: "videos"
    }
  },
  computed: {
    cms() {
      return this.$static.cms
    },
    latestPosts() {
      // the maximum nr of videos to show is defined by `limit` in the 
      // graphql query
      return this.cms.latestVideos || []
    },
    featuredPosts() {
      return this.cms.featuredPost && this.cms.featuredPost.videos || []
    },
    totalNrOfPosts() {
      return this.cms.videosCount
    },
  }
}
</script>

<style lang="less" scoped>

</style>
