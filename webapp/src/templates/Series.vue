<template>
  <div class="main-series h-entry as-series">
    <h1>{{ headerText }} <span class="series">{{ seriesTitle }}</span></h1>

    <div v-if="series">
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
query Collection {
  cms {
    collections {
      title
      description
      photos {
        id
        title
        slug
        createdAt
        categories {
          id
          title
        }
        series {
          id
          title
        }
        photo {
          id
          url
        }
        date
        location {
          landmark
          city
          state_province
          country
        }
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
  name: 'Series',
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
    /* Individual Series pages are not pre-generated,
     * thus we need to query the URL
     * and find the right Series by filtering the full Categories array
     */
    this.seriesTitle = this.$route.params.series
  },
  metaInfo() {
    return {}
  },
  computed: {
    cms() {
      return this.$page.cms
    },
    allSeries() {
      // a "series" is defined as a "collection" in CMS because CMS 
      // can not handle names that are the same in singular and 
      // plural form ("series", "series").
      return this.cms.collections
    },
    series() {
      return this.allSeries.filter(series => series.title.toLowerCase() === this.seriesTitle.toLowerCase())[0]
    },
    postsType() {
      const routeName = this.$route.name
      let postsType = routeName.replace("__p_","").replace("__","").split('_')[0];
      // note that postsType is plural: 
      // expect "posts", "photos" or "videos"
      return postsType
    },
    headerText() {
      // Note: if this website template is to be used for multi-language
      // versions, any currently hardcoded text must be moved to the CMS
      // as a tokenized string.
      return "All " + this.postsType + " in series "
    },
    sortText() {
      return "Reverse sort order"
    },
    photos() {
      return this.getMatchedPosts("photo")
    },
    videos() {
      return this.getMatchedPosts("video")
    },
    posts() {
      return [].concat(this.photos, this.videos).sort((a,b) => this.sortByDate(a,b))
    },
  },
  methods: {
    getMatchedPosts(postsTypeSingular) {
      if (this.series && (this.postsType === postsTypeSingular+"s" || this.postsType === "posts")) {
        let posts = this.series[postsTypeSingular+"s"]
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

.series {
  font-style: italic;
}
.sort {
  margin-bottom: 1em;
}
</style>