<template>
  <div class="main-series h-entry as-series">
    <h1>{{ headerText }} <span class="series">{{ seriesTitle }}</span></h1>

    <div
      v-if="series"
    >
      <div class="description p-summary" v-if="description">
        {{ description }}
      </div>

      <TaxonomyPosts
        :posts="posts"
        :postsType = "postsType"
      />
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
        date
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
          width
          height
          size
          alternativeText
          formats
        }
        createdAt
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
        youtubeId
        description
        video {
          id
          url
        }
        coverImage {
          id
          url
          width
          height
          size
          alternativeText
          formats
        }
        date
        categories {
          id
          title
        }
        series {
          id
          title
        }
        createdAt
        publicationDate
      }
      arts {
        id
        title
        slug
        categories {
          id
          title
        }
        series {
          id
          title
        }
        image {
          id
          url
          width
          height
          size
          alternativeText
          formats
        }
        date
        createdAt
      }
    }
  }
}
</page-query>

<script>
import TaxonomyPosts from '~/components/TaxonomyPosts'
import NoPostsFound from '~/components/NoPostsFound'
import taxonomy from '@/mixins/taxonomy.js'
import { getMetaTags } from '~/utils/meta-tags'

export default {
  name: 'Series',
  mixins: [taxonomy],
  data() {
    return {
    }
  },
  components: {
    TaxonomyPosts,
    NoPostsFound,
  },
  created() {
    /* Individual Series pages are not pre-generated,
     * thus we need to query the URL
     * and find the right Series by filtering the full Categories array
     */
    this.seriesTitle = this.$route.params.series || ""
  },
  metaInfo() {
    if (this.series) {
      this.series.description = this.series.description || this.headerText + this.series.title
      return getMetaTags(this.series, this.$route) 
    }
  },
  computed: {
    cms() {
      return this.$page.cms
    },
    allSeries() {
      // a "series" is defined as a "collection" in CMS because CMS 
      // can not handle names that are the same in singular and 
      // plural form ("series", "series").
      return this.cms && this.cms.collections || []
    },
    series() {
      return this.allSeries.filter(series => series.title.toLowerCase() === this.seriesTitle.toLowerCase())[0]
    },
    taxonomy() {
      return this.series;
    },
    description() {
      return this.series.description
    },
    headerText() {
      // Note: if this website template is to be used for multi-language
      // versions, any currently hardcoded text must be moved to the CMS
      // as a tokenized string.
      let postsType = this.postsType
      if (postsType === "arts") postsType = "art works"
      return this.toTitleCase(postsType) + " in series "
    },
    posts() {
      return [].concat(this.photos, this.videos, this.arts).sort((a,b) => this.sortByDate(a,b))
    },
    hasMultiplePosts() {
      return this.posts.length > 1
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
.description {
  font-style: italic;
  margin-bottom: 2em;
}
.sort {
  margin-bottom: 1em;
}
</style>