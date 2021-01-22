<template>
  <div class="main-category h-entry as-category">
    <h1>{{ headerText }} <span class="category">{{ categoryTitle }}</span></h1>

    <div
      v-if="category"
    >
      <div
        v-if="hasMultiplePosts"
        class="sort action button"
        @click="reverseSort"
      >
        {{ sortText }}
      </div>

      <div class="h-feed">
        <transition-group name="list" tag="div" class="cards-container">
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
        }
        date
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
import { getMetaTags } from '~/utils/meta-tags'

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
    this.categoryTitle = this.$route.params.category || ""
  },
  metaInfo() {
    if (this.category) {
      this.category.description = this.category.description || this.headerText + this.category.title
      return getMetaTags(this.category, this.$route) 
    }
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
      let postsType = this.postsType
      if (postsType === "arts") postsType = "art works"
      return this.toTitleCase(postsType) + " in category "
    },
    posts() {
      return [].concat(this.articles, this.photos, this.arts, this.videos).sort((a,b) => this.sortByDate(a,b))
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

.category {
  font-style: italic;
}
.sort {
  margin-bottom: 1em;
}
</style>