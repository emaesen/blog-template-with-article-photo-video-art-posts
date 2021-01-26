<template>
  <div class="main-index">

    <h1>{{ page.title }}</h1>

    <g-image
      v-if="introImage"
      class="img-postcat"
      alt="all posts"
      :src="introImage"
    />

    <RichText
      v-if="page.introduction"
      :data="page.introduction"
      class="para intro"
    />

    <!-- Section with latest/featured articles -->
    <SelectedArticles/>

    <!-- Section with latest/featured photos -->
    <SelectedPhotos/>

    <!-- Section with latest/featured videos -->
    <SelectedVideos/>

    <!-- Section with latest/featured art -->
    <SelectedArts/>

    <!-- Section with latest/featured notes -->
    <SelectedNotes/>

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
import SelectedArticles from '~/components/SelectedArticles'
import SelectedPhotos from '~/components/SelectedPhotos'
import SelectedVideos from '~/components/SelectedVideos'
import SelectedArts from '~/components/SelectedArts'
import SelectedNotes from '~/components/SelectedNotes'

import { getCmsMedia } from '~/utils/medias'
import { getMetaTags } from '~/utils/meta-tags'


export default {
  name: 'Posts',
  components: {
    RichText,
    SelectedArticles,
    SelectedPhotos,
    SelectedVideos,
    SelectedArts,
    SelectedNotes,
  },
  data() {
    return {
    }
  },
  metaInfo() {
    return getMetaTags(this.page.seo, this.$route)
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
