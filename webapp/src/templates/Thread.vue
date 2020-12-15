<template>
  <div class="main-thread h-entry as-thread">
    <h1>{{ headerText }} <span class="thread">{{ threadTitle }}</span></h1>

    <div v-if="thread">

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
query Thread {
  cms {
    threads {
      title
      description
      notes {
        id
        text
        slug
        createdAt
      }
    }
  }
}</page-query>

<script>
import PostCard from '~/components/PostCard'
import NoPostsFound from '~/components/NoPostsFound'

export default {
  name: 'Thread',
  mixins: [],
  data() {
    return {
      showLatestOnTop: false
    }
  },
  components: {
    PostCard,
    NoPostsFound,
  },
  created() {
    /* Individual Thread pages are not pre-generated,
     * thus we need to query the URL
     * and find the right Thread by filtering the full threads array
     */
    this.threadTitle = this.$route.params.thread
  },
  metaInfo() {
    return {}
  },
  computed: {
    cms() {
      return this.$page.cms
    },
    threads() {
      return this.cms.threads
    },
    thread() {
      return this.threads.filter(thread => thread.title.toLowerCase() === this.threadTitle.toLowerCase())[0]
    },
    postsType() {
      const routeName = this.$route.name
      let postsType = routeName.replace("__p_","").replace("__","").split('_')[0];
      // note that postsType is plural: 
      // expect "posts" or "notes"
      return postsType
    },
    headerText() {
      // Note: if this website template is to be used for multi-language
      // versions, any currently hardcoded text must be moved to the CMS
      // as a tokenized string.
      return "All " + this.postsType + " in thread "
    },
    sortText() {
      return "Reverse sort order"
    },
    notes() {
      return this.getMatchedPosts("note")
    },
    posts() {
      return this.notes.sort((a,b) => this.sortByDate(a,b)).map(p=>{p.createdAt = null; return p})
    },
  },
  methods: {
    getMatchedPosts(postsTypeSingular) {
      if (this.thread && (this.postsType === postsTypeSingular+"s" || this.postsType === "posts")) {
        let posts = this.thread[postsTypeSingular+"s"]
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

.thread {
  font-style: italic;
}
.sort {
  margin-bottom: 1em;
}
</style>