<template>
  <div class="main-about">

    <h1>{{$page.cms.about.title}}</h1>

    <Content :content="$page.cms.about.content" class="" />

    <PrivacyPolicy/>
    
  </div>
</template>

<script>
import Content from '~/components/Content'
import PrivacyPolicy from '~/components/PrivacyPolicy'
import { getCmsMedia } from '~/utils/medias'
import { getMetaTags } from '~/utils/meta-tags'


export default {
  components: {
    Content,
    PrivacyPolicy,
  },
  metaInfo() {
    return getMetaTags(this.$page.cms.about.seo) 
  },
}
</script>

<page-query>
query AboutPage {
  cms {
    about {
      title
      content {
        __typename
        ... on cmsTypes_ComponentSectionsRichText {
          id
          content
        }
        ... on cmsTypes_ComponentSectionsLargeMedia {
          id
          media {
            id
            url
            mime
          }
          description
        }
        ... on cmsTypes_ComponentSectionsImagesSlider {
          id
          title
          sliderImages {
            id
            slide {
              type
              title
              slug
              url
              image {
                name
                url
              }
            }
          }
        }
      }
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
