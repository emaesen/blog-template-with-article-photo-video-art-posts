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
        createdAt
      }
      videos {
        id
        title
        slug
        createdAt
      }
    }
  }
}
</page-query>

<script>
import PostCard from '~/components/PostCard'
import NoPostsFound from '~/components/NoPostsFound'

export default {
  name: 'Category',
  mixins: [],
  data() {
    return {
      showLatestOnTop: true
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
    cms() {
      return this.$page.cms
    },
    categories() {
      return this.cms.categories
    },
    category() {
      return this.categories.filter(category => category.title === this.categoryTitle)[0]
    },
    postsType() {
      const routeName = this.$route.name
      let postsType = routeName.replace("__p_","").replace("__","").split('_')[0];
      // note that postsType is plural: 
      // expect "posts", "articles", "photos" or "videos"
      return postsType
    },
    headerText() {
      // Note: if this website template is to be used for multi-language
      // versions, any currently hardcoded text must be moved to the CMS
      // as a tokenized string.
      return "All " + this.postsType + " in category "
    },
    sortText() {
      return "Reverse sort order"
    },
    articles() {
      return this.getMatchedPosts("article")
    },
    photos() {
      return this.getMatchedPosts("photo")
    },
    videos() {
      return this.getMatchedPosts("video")
    },
    posts() {
      return [].concat(this.articles, this.photos, this.videos).sort((a,b) => this.sortByDate(a,b))
    },
  },
  methods: {
    getMatchedPosts(postsTypeSingular) {
      if (this.category && (this.postsType === postsTypeSingular+"s" || this.postsType === "posts")) {
        let posts = this.category[postsTypeSingular+"s"]
        posts.map(p => p.type=postsTypeSingular)
        return posts || []
      } else {
        return []
      }
    },
    sortByDate(postA,postB) {
      let a,b
      if (this.showLatestOnTop) {
        a=postA
        b=postB
      } else {
        b=postA
        a=postB
      }
      return (new Date(b.createdAt)).getTime() - (new Date(a.createdAt)).getTime()
    },
    reverseSort() {
      this.showLatestOnTop = !this.showLatestOnTop
    }
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