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
import taxonomy from '@/mixins/taxonomy.js'

export default {
  name: 'Series',
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
    taxonomy() {
      return this.series;
    },
    headerText() {
      // Note: if this website template is to be used for multi-language
      // versions, any currently hardcoded text must be moved to the CMS
      // as a tokenized string.
      return "All " + this.postsType + " in series "
    },
    posts() {
      return [].concat(this.photos, this.videos).sort((a,b) => this.sortByDate(a,b))
    },
  },
  methods: {
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