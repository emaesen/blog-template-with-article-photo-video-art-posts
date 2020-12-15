<template>
  <div class="main-category h-entry as-category">
    <h1>{{ headerText }} <span class="category">{{ categoryTitle }}</span></h1>

    <div v-if="category">
      <div class="sort action button" @click="reverseSort">
        {{ sortText }}
      </div>

      <div class="h-feed">
        <div class="cards-container">
          <transition-group name="list" tag="div">
          <PostCard
            v-for="post in posts"
            :key="post.id"
            :post="post"
            :postType="post.type"
            :postsType = "postsType"
          />
          </transition-group>
        </div>
      </div>
    </div>

    <div v-else>
      <NoPostsFound
        :postsType = "postsType"
      />
    </div>

  </div>
</template>

<page-query>
query Category {
  cms {
    categories {
      title
      description
      articles {
        id
        title
        slug
        createdAt
      }
      photos {
        id
        title
        slug
        date
      }
      videos {
        id
        title
        slug
        date
      }
    }
  }
}
</page-query>

<script>
import PostCard from '~/components/PostCard'
import NoPostsFound from '~/components/NoPostsFound'
import taxonomy from '@/mixins/taxonomy.js'

export default {
  name: 'Category',
  mixins: [taxonomy],
  data() {
    return {
    }
  },
  components: {
    PostCard,
    NoPostsFound,
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
      return this.cms.categories
    },
    category() {
      return this.categories.filter(category => category.title === this.categoryTitle)[0]
    },
    taxonomy() {
      return this.category;
    },
    headerText() {
      // Note: if this website template is to be used for multi-language
      // versions, any currently hardcoded text must be moved to the CMS
      // as a tokenized string.
      return "All " + this.postsType + " in category "
    },
    posts() {
      return [].concat(this.articles, this.photos, this.videos).sort((a,b) => this.sortByDate(a,b))
    },
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
@import "~/assets/styles/transi.less";

.category {
  font-style: italic;
}
.sort {
  margin-bottom: 1em;
}
</style>