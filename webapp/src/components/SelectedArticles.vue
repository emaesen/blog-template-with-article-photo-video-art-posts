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
query LatestArticles($limit: Int = 6) {
  cms {
    # List articles
    latestArticles: articles(sort: "createdAt:desc" limit:$limit) {
      id
      title
      createdAt
      slug
      description
      categories {
        id
        title
      }
      coverImage {
        id
        url
        width
        height
        alternativeText
        formats
      }
    }
    articlesCount
    featuredPost {
      articles(sort: "createdAt:desc") {
        id
        title
        createdAt
        slug
        description
        categories {
          id
          title
        }
        coverImage {
          id
          url
          width
          height
          alternativeText
          formats
        }
      }
    }
  }
}
</static-query>

<script>
import SelectedPosts from '~/components/SelectedPosts'

export default {
  name: 'SelectedArticles',
  methods: {
  },
  components: {
    SelectedPosts,
  },
  data() {
    return {
      postType: "article",
      postsType: "articles",
      postDisplayName: "article",
      postsDisplayName: "articles"
    }
  },
  computed: {
    cms() {
      return this.$static.cms
    },
    latestPosts() {
      // the maximum nr of articles to show is defined by `limit` in the 
      // graphql query
      return this.cms.latestArticles || []
    },
    featuredPosts() {
      return this.cms.featuredPost && this.cms.featuredPost.articles || []
    },
    totalNrOfPosts() {
      return this.cms.articlesCount
    },
  }
}
</script>

<style lang="less" scoped>

</style>
