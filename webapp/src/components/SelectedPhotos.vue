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
      createdAt
    }
    photosCount
    featuredPost {
      photos(sort: "createdAt:desc") {
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
        createdAt
      }
    }
  }
}
</static-query>

<script>
import SelectedPosts from '~/components/SelectedPosts'

export default {
  name: 'selectedPhotos',
  mixins: [],
  components: {
    SelectedPosts,
  },
  data() {
    return {
      postType: "photo",
      postsType: "photos",
      postDisplayName: "photo",
      postsDisplayName: "photos"
    }
  },
  computed: {
    latestPosts() {
      // the maximum nr of photos to show is defined by `limit` in the 
      // graphql query
      return this.$static.cms.latestPhotos
    },
    featuredPosts() {
      return this.$static.cms.featuredPost.photos
    },
    totalNrOfPosts() {
      return this.$static.cms.photosCount
    },
  },
  methods: {
  },
}
</script>

<style lang="less" scoped>

</style>
