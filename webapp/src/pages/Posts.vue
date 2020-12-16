<template>
  <div class="main-index">

    <h1>{{ $page.cms.postsPage.title }}</h1>

    <RichText :data="$page.cms.postsPage.introduction" class="para intro"/>

    <!-- Section with latest articles -->
    <LatestArticles/>

    <!-- Section with latest photos -->
    <LatestPhotos/>

  </div>
</template>

<page-query>
query PostsPage {
  cms {
    # Get posts data
    postsPage {
      title
      introduction
      # Metadata for SEO
      seo {
        title
        description
        shareImage {
          id
          url
        }
      }
    }
  }
}
</page-query>

<script>
import RichText from '~/components/RichText'
import LatestArticles from '~/components/LatestArticles'
import LatestPhotos from '~/components/LatestPhotos'

import { getCmsMedia } from '~/utils/medias'
import { getMetaTags } from '~/utils/meta-tags'


export default {
  name: 'Posts',
  components: {
    RichText,
    LatestArticles,
    LatestPhotos,
  },
  data() {
    return {
    }
  },
  metaInfo() {
    return getMetaTags(this.page.seo) 
  },
  computed: {
    page() {
      return this.$page.cms.postsPage
    }
  },
}
</script>

<style lang="less" scoped>

</style>
