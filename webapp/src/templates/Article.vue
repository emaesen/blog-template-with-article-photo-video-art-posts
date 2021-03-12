<template>
  <div class="main-article">
    <article class="h-entry">
      <h1>
      <span  @click="goBackOrUp">
        <IconGoBackOrUp :title="goBackOrUpText"/>
      </span>
      <span class="p-name">
        {{ article.title }}
      </span>
      </h1>
      <div class="meta deemph para">
        <div class="date dt-published">
          {{ dateText }}
        </div>
      </div>

      <div class="e-content">
        <ResponsiveImage
          v-if="image"
          :alt="article.title"
          :data="image"
        />
        <div class="description para cursive">
          {{ article.description }}
        </div>

        <RichText :data="article.content" />
      </div>

    </article>
  </div>
</template>

<page-query>
query Article ($slug: String!) {
  cms {
    articles(where: { slug: $slug }) {
      id
      title
      slug
      description
      categories {
        id
        title
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
      content
      date
      createdAt
      publicationDate
    }
  }
}
</page-query>

<script>
import IconGoBackOrUp from '~/components/IconGoBackOrUp'
import RichText from '~/components/RichText'
import ResponsiveImage from '~/components/ResponsiveImage'

import { getMetaTags } from '~/utils/meta-tags'
import date from '@/mixins/date.js'
import goBackOrUp from '@/mixins/go-back-or-up.js'

export default {
  name: 'Article',
  mixins: [date, goBackOrUp],
  components: {
    IconGoBackOrUp,
    RichText,
    ResponsiveImage,
  },
  metaInfo() {
    return getMetaTags(this.article, this.$route) 
  },
  computed: {
    article() {
      return this.$page.cms.articles[0] || {}
    },
    image() {
      return this.article.coverImage
    },
    dateText() {
      let opts = {shortForm:true, showYear:true};
      let text = this.formattedDate(this.article.createdAt, opts);
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
.description {
  text-align: right;
  margin-top: -2em;
  margin-bottom: 2em;
}
</style>