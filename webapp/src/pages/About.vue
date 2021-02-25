<template>
  <div class="main-about">

    <h1>{{aboutPage.title}}</h1>

    <Content :content="aboutPage.content" class="" />

    <PrivacyPolicy/>
    
  </div>
</template>

<script>
import Content from '~/components/Content'
import PrivacyPolicy from '~/components/PrivacyPolicy'
import { getMetaTags } from '~/utils/meta-tags'


export default {
  name: 'About',
  components: {
    Content,
    PrivacyPolicy,
  },
  metaInfo() {
    return getMetaTags(this.aboutPage.seo, this.$route) 
  },
  computed: {
    aboutPage() {
      return this.$page.cms.about || {}
    }
  }
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
            width
            height
            size
            alternativeText
            formats
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
