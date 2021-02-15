<template>
  <div class="main-thread h-entry as-thread">
    <h1>{{ headerText }} <span class="thread-title">{{ threadTitle }}</span></h1>

    <div v-if="thread">

      <div v-if="threadDescription" class="thread-description">
        {{ threadDescription }}
      </div>

      <div class="h-feed">
        <transition-group name="list" tag="div" class="cards-container">
          <PostCard
            v-for="post in posts"
            :key="post.id"
            :post="post"
            :postType="post.type"
            :postsType = "postsType"
            :nrPostsInRow="1"
          />
        </transition-group>
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
import taxonomy from '@/mixins/taxonomy.js'
import { getMetaTags } from '~/utils/meta-tags'

export default {
  name: 'Thread',
  mixins: [taxonomy],
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
    this.threadTitle = this.$route.params.thread || ""
  },
  metaInfo() {
    if (this.thread) {
      this.thread.description = this.thread.description || this.headerText + this.thread.title
      return getMetaTags(this.thread, this.$route) 
    }
  },
  computed: {
    threads() {
      return this.cms.threads
    },
    thread() {
      return this.threads.filter(thread => thread.title.toLowerCase() === this.threadTitle.toLowerCase())[0]
    },
    threadDescription() {
      return this.thread.description
    },
    taxonomy() {
      return this.thread;
    },
    headerText() {
      // Note: if this website template is to be used for multi-language
      // versions, any currently hardcoded text must be moved to the CMS
      // as a tokenized string.
      return this.toTitleCase(this.postsType) + " in thread "
    },
    posts() {
      return this.notes.sort((a,b) => this.sortByDate(a,b)).map(p=>{p.createdAt = null; return p})
    },
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
@import "~/assets/styles/transi.less";

.thread-title {
  font-style: italic;
}
.thread-description {
  margin-bottom: 2em;
  font-style: italic;
}
.cards-container {
  flex-direction: column;
  flex-wrap: nowrap;
}

</style>