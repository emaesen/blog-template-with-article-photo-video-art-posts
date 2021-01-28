<template>
  <div class="main-biography">

    <h1>{{bio.title}}</h1>

    <div
      v-if="bio.introduction"
      class="biography-introduction p-summary"
    >
       {{ bio.introduction }}
    </div>

    <div class="biography-cards-container">
      <BiographyCard
        v-for="bioItem in bioItems"
        :key="bioItem.id"
        :bioItem="bioItem"
      />
    </div>
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
    return getMetaTags(this.bio.seo, this.$route) 
  },
  computed: {
    bio() {
      return this.$page.cms.biography
    },
    bioItems() {
      return this.bio.biographyItem
    }
  }
}
</script>

<page-query>
query BiographyPage {
  cms {
    biography {
      title
      introduction
      biographyItem {
        id
        when
        where
        what
        image {
          id
          url
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
