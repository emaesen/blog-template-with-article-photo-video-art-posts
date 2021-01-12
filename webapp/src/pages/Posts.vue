<template>
  <div class="main-index">

    <h1>{{ page.title }}</h1>

    <g-image
      v-if="introImage"
      class="img-postcat"
      alt="videos posts"
      :src="introImage"
    />

    <RichText
      v-if="page.introduction"
      :data="page.introduction"
      class="para intro"
    />

    <!-- Section with latest articles -->
    <LatestArticles/>

    <!-- Section with latest photos -->
    <LatestPhotos/>

    <!-- Section with latest videos -->
    <LatestVideos/>

    <!-- Section with latest notes -->
    <LatestNotes/>

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
import LatestVideos from '~/components/LatestVideos'
import LatestNotes from '~/components/LatestNotes'

import { getCmsMedia } from '~/utils/medias'
import { getMetaTags } from '~/utils/meta-tags'


export default {
  name: 'Posts',
  components: {
    RichText,
    LatestArticles,
    LatestPhotos,
    LatestVideos,
    LatestNotes,
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
    },
    introImage() {
      const img = this.page.seo.shareImage
      return getCmsMedia(img && img.url)
    },
  },
}
</script>

<style lang="less" scoped>

</style>
