<template>
  <div class="main-art h-entry as-art">
    
    <h1>
      <span  @click="goBackOrUp">
        <IconGoBackOrUp :title="goBackOrUpText"/>
      </span>
      <span class="p-name">
        {{ art.title }}
      </span>
    </h1>
    <div class="date dt-published">
      {{ datePublishedText }}
    </div>

    <div class="e-content">
      <ResponsiveImage
        :alt="art.title"
        :data="image"
      />
      <div class="meta deemph">
        <div class="date dt-taken">
          {{ dateCreatedText }}
        </div>
        <div class="categories">
          <span
            v-for="category in art.categories"
            :key="category.id"
            class="category p-category post-category"
          >
            <g-link :to="categoryBasePath + category.title" class="nodeco">
              #{{ category.title }}
            </g-link>
          </span>
        </div>
        <div v-if="seriesTitle" class="series">
          Series: 
          <g-link :to="seriesBasePath + seriesTitle" class="nodeco post-series p-category">
              ❈ {{ seriesTitle }}
            </g-link>
        </div>
      </div>

      <div class="description para spacious">
        {{ art.description }}
      </div>
    </div>
  </div>
</template>

<page-query>
query Art ($slug: String!) {
  cms {
    arts(where: { slug: $slug }) {
      id
      title
      slug
      description
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
</page-query>

<script>
import IconGoBackOrUp from '~/components/IconGoBackOrUp'
import Content from '~/components/Content'
import ResponsiveImage from '~/components/ResponsiveImage'

import { getMetaTags } from '~/utils/meta-tags'
import date from '@/mixins/date.js'
import goBackOrUp from '@/mixins/go-back-or-up.js'


export default {
  name: 'Art',
  mixins: [date, goBackOrUp],
  components: {
    IconGoBackOrUp,
    Content,
    ResponsiveImage,
  },
  mounted() {
  },
  metaInfo() {
    return getMetaTags(this.art, this.$route) 
  },
  computed: {
    art() {
      return this.$page.cms.arts[0] || {}
    },
    image() {
      return this.art.image
    },
    categoryBasePath() {
      return '/p/arts/c/'
    },
    seriesBasePath() {
      return '/p/arts/s/'
    },
    seriesTitle() {
      const series = this.art && this.art.series
      return series && series.title
    },
    dateCreatedText() {
      let opts = {shortForm:true, showYear:true};
      let text = this.formattedDate(this.art.date, opts);
      return text;
    },
    datePublishedText() {
      let opts = {shortForm:true, showYear:true};
      let text = this.formattedDate(this.art.createdAt, opts);
      return text;
    },
  },
  methods: {
  },
}
</script>

<style lang="less" scoped>
.dt-published {
  position: relative;
  top: -3em;
  font-style: italic;
  font-size: 0.9em;
  opacity: 0.8;
}
.meta {
  text-align: center;
  font-style: italic;
}
.category {
  font-size: 0.9em;
  opacity: 0.6;
  margin: 0 1em;
}
</style>