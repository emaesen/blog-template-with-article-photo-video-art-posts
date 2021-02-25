<template>
  <div class="main-index">

    <h1>{{ page.title }}</h1>

    <ResponsiveImage
      v-if="introImage"
      class="img-postcat"
      :data="introImage"
      sizes="(min-width: 600px) 120px, (max-width: 600px) 20vw"
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
          width
          height
          size
          alternativeText
          formats
        }
      }
    }
  }
}
</page-query>

<script>
import ResponsiveImage from '~/components/ResponsiveImage'
import RichText from '~/components/RichText'
import SelectedArticles from '~/components/SelectedArticles'
import SelectedPhotos from '~/components/SelectedPhotos'
import SelectedVideos from '~/components/SelectedVideos'
import SelectedArts from '~/components/SelectedArts'
import SelectedNotes from '~/components/SelectedNotes'

import { getMetaTags } from '~/utils/meta-tags'


export default {
  name: 'Posts',
  components: {
    ResponsiveImage,
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
    return getMetaTags(this.page && this.page.seo, this.$route)
  },
  computed: {
    page() {
      return this.$page.cms.postsPage || {}
    },
    introImage() {
      return this.page.seo && this.page.seo.shareImage
    },
  },
}
</script>

<style lang="less" scoped>

</style>
