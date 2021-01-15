<template>
  <div class="main-arts">
    <h1>{{artsPage.title}}</h1>

    <g-image
      v-if="introImage"
      class="img-postcat"
      alt="arts posts"
      :src="introImage"
    />

    <RichText :data="artsPage.introduction" class="para intro group"/>

    <div class="h-feed">
      <div class="cards-container">
        <PostCard
          v-for="art in arts"
          :key="art.id"
          :post="art"
          postType="art"
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
  name: 'Arts',
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
    return getMetaTags(this.artsPage.seo, this.$route) 
  },
  computed: {
    artsPage() {
      return this.$page.cms.artsPage
    },
    arts() {
      // the maximum nr of arts to show is defined by `limit` in the 
      // graphql query
      console.log({arts:this.$page.cms.arts})
      return this.$page.cms.arts
    },
    introImage() {
      const img = this.artsPage.seo.shareImage
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
query ArtsPage ($sort: String!, $start: Int, $limit: Int) {
  cms {
    artsPage {
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

    # List arts
    arts (sort: $sort, limit:$limit, start:$start) {
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
      }
      createdAt
      date
    }

  }
}
</page-query>

<style lang="less" scoped>
</style>