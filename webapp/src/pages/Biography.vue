<template>
  <div class="main-biography">

    <h1>{{$page.cms.biography.title}}</h1>

    

    
  </div>
</template>

<script>
import BiographyCard from '~/components/BiographyCard'
import { getMetaTags } from '~/utils/meta-tags'


export default {
  name: 'Biography',
  components: {
    BiographyCard,
  },
  metaInfo() {
    return getMetaTags(this.$page.cms.biography.seo, this.$route) 
  },
}
</script>

<page-query>
query BiographyPage {
  cms {
    biography {
      title
      biographyItem {
        id
        activity
        organization {
          name
          role
          website {
            url
            title
          }
        }
        location
        description
        startYear
        startMonth
        endYear
        endMonth
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
