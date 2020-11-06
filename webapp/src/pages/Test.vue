<template>
  <Layout>
    <h1>{{$page.cms.test.title}}</h1>
    <RichText :data="$page.cms.test.richText" class="" />
  </Layout>
</template>

<script>
import RichText from '~/components/RichText'
import { getCmsMedia } from '~/utils/medias'
import { getSeoMetaTags } from '~/utils/seo'

export default {
  components: {
    RichText,
  },
  metaInfo() {
    const { title, description, shareImage } = this.$page.cms.test.seo
    const image = shareImage && getCmsMedia(shareImage.url)
    return {
      title,
      meta: getSeoMetaTags(title, description, image),
    }
  },
}
</script>

<page-query>
query TestPage {
  cms {
    test {
      title
      richText
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
