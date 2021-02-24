<template>
  <div class="main-notes">
    <h1>{{notesPage.title}}</h1>

    <ResponsiveImage
      v-if="introImage"
      class="img-postcat"
      alt="note posts"
      :data="introImage"
      sizes="(min-width: 600px) 120px, 20vw !"
    />

    <RichText :data="notesPage.introduction" class="para intro group"/>

    <PaginatedPosts
      postType="note"
      :posts="notes"
      :basePath="basePath"
      :subPath="subPath"
      :currentPage="currentPage"
      :totalPages="totalPages"
    />

  </div>
</template>

<script>
import PaginatedPosts from '~/components/PaginatedPosts'
import RichText from '~/components/RichText'
import ResponsiveImage from '~/components/ResponsiveImage'

import { getMetaTags } from '~/utils/meta-tags'

export default {
  name: 'Notes',
  methods: {
  },
  components: {
    PaginatedPosts,
    RichText,
    ResponsiveImage,
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  metaInfo() {
    return getMetaTags(this.notesPage.seo, this.$route) 
  },
  computed: {
    notesPage() {
      return this.$page.cms.notesPage || {}
    },
    notes() {
      // the maximum nr of notes to show is defined by `limit` in the 
      // graphql query
      return this.$page.cms.notes
    },
    introImage() {
      const img = this.notesPage.seo && this.notesPage.seo.shareImage
      return img
    },
    basePath() {
      return this.$context.basePath;
    },
    subPath() {
      return this.$context.subPath;
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
query NotesPage ($sort: String!, $start: Int, $limit: Int) {
  cms {
    notesPage {
      title
      introduction
      seo {
        title
        description
        shareImage {
          id
          url
          width
          height
          alternativeText
          formats
        }
      }
    }

    # List notes
    notes (sort: $sort, limit:$limit, start:$start) {
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
</page-query>

<style lang="less" scoped>

</style>