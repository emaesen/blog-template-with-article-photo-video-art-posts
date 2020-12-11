<template>
  <div class="main-category h-entry as-category">
    <h1>{{ headerText }}</h1>


  </div>
</template>

<page-query>
query Category {
  cms {
    categories {
      title
      description
      articles {
        title
        slug
      }
      photos {
        title
        slug
      }
      videos {
        title
        slug
      }
    }
  }
}
</page-query>

<script>



export default {
  name: 'Category',
  mixins: [],
  components: {

  },
  created() {
    /* Individual Category pages are not pre-generated,
     * thus we need to query the URL
     * and find the right Category by filtering the full Categories array
     */
    this.categoryTitle = this.$route.params.category
  },
  metaInfo() {
    return {}
  },
  computed: {
    categories() {
      return this.$page.cms.categories
    },
    category() {
      return this.categories.filter(category => category.title === this.categoryTitle)[0]
    },
    postType() {
      const routeName = this.$route.name
      let postType = routeName.replace("__p_","").replace("__","").split('_')[0];
      // note that postType is plural: 
      // expect "posts", "articles", "photos" or "videos"
      return postType
    },
    headerText() {
      // Note: if this website template is to be used for multi-language
      // versions, any currently hardcoded text must be moved to the CMS
      // as a tokenized string.
      return "All " + this.postType + " in category: " + this.category.title
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>

</style>