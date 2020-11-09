<template>
  <Layout>
    <h1>{{$page.cms.test.title}}</h1>
    <RichText :data="$page.cms.test.richText" class="" />
  </Layout>
</template>

<script>
import RichText from '~/components/RichText'
import { getCmsMedia } from '~/utils/medias'
import { getMetaTags } from '~/utils/meta-tags'


export default {
  components: {
    RichText,
  },
  metaInfo() {
    return getMetaTags(this.$page.cms.test.seo) 
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
