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
query LatestNotes($limit: Int = 6) {
  cms {
    # List notes
    latestNotes: notes(sort: "createdAt:desc" limit:$limit) {
      id
      text
      slug
      createdAt
      thread {
        title
      }
    }
    notesCount
    featuredPost {
      notes(sort: "createdAt:desc") {
        id
        text
        slug
        createdAt
        thread {
          title
        }
      }
    }
  }
}
</static-query>

<script>
import SelectedPosts from '~/components/SelectedPosts'

export default {
  name: 'SelectedNotes',
  methods: {
  },
  components: {
    SelectedPosts,
  },
  data() {
    return {
      postType: "note",
      postsType: "notes",
      postDisplayName: "note",
      postsDisplayName: "notes"
    }
  },
  computed: {
    latestPosts() {
      // the maximum nr of notes to show is defined by `limit` in the 
      // graphql query
      return this.$static.cms.latestNotes
    },
    featuredPosts() {
      return this.$static.cms.featuredPost.notes
    },
    totalNrOfPosts() {
      return this.$static.cms.notesCount
    },

  }
}
</script>

<style lang="less" scoped>

</style>
