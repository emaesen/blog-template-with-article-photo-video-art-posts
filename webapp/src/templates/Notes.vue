<template>
  <div class="main-notes">
    <h1>{{notesPage.title}}</h1>

    <g-image
      v-if="introImage"
      class="img-postcat"
      alt="note posts"
      :src="introImage"
    />

    <RichText :data="notesPage.introduction" class="para intro group"/>

    <PaginatedPosts
      postType="note"
      :posts="notes"
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
  name: 'Notes',
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
    return getMetaTags(this.notesPage.seo, this.$route) 
  },
  computed: {
    notesPage() {
      return this.$page.cms.notesPage
    },
    notes() {
      // the maximum nr of notes to show is defined by `limit` in the 
      // graphql query
      return this.$page.cms.notes
    },
    introImage() {
      const img = this.notesPage.seo.shareImage
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