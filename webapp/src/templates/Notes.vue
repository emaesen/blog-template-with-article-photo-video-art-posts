<template>
  <div class="main-notes">
    <h1>{{notesPage.title}}</h1>

    <g-image
      v-if="introImage"
      class="img-postcat"
      alt="notes posts"
      :src="introImage"
    />

    <RichText :data="notesPage.introduction" class="para intro group"/>

    <div class="h-feed">
      <div class="cards-container">
        <PostCard
          v-for="note in notes"
          :key="note.id"
          :post="note"
          postType="note"
          postsType="notes"
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
  name: 'Notes',
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
    return getMetaTags(this.notesPage.seo, this.$route) 
  },
  computed: {
    notesPage() {
      return this.$page.cms.notesPage
    },
    notes() {
      // the maximum nr of notes to show is defined by `limit` in the 
      // graphql query
      console.log({notes:this.$page.cms.notes})
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