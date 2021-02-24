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
        width
        height
        alternativeText
        formats
      }
      createdAt
      date
    }
    artsCount
    featuredPost {
      arts(sort: "createdAt:desc") {
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
          width
          height
          alternativeText
          formats
        }
        createdAt
        date
      }
    }
  }
}
</static-query>

<script>
import SelectedPosts from '~/components/SelectedPosts'

export default {
  name: 'SelectedArts',
  methods: {
  },
  components: {
    SelectedPosts,
  },
  data() {
    return {
      postType: "art",
      postsType: "arts",
      postDisplayName: "art work",
      postsDisplayName: "art works"
    }
  },
  computed: {
    cms() {
      return this.$static.cms
    },
    latestPosts() {
      // the maximum nr of arts to show is defined by `limit` in the 
      // graphql query
      return this.cms.latestArts || []
    },
    featuredPosts() {
      return this.cms.featuredPost && this.cms.featuredPost.arts || []
    },
    totalNrOfPosts() {
      return this.cms.artsCount
    },
  }
}
</script>

<style lang="less" scoped>

</style>
