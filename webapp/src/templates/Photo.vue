<template>
  <div class="main-photo h-entry as-photo">
    
    <h1>
      <span  @click="goBackOrUp">
        <IconGoBackOrUp :title="goBackOrUpText"/>
      </span>
      {{ photo.title }}
    </h1>
    <div class="date dt-published">
      {{ datePublishedText }}
    </div>


    <ResponsiveImage
      :alt="photo.title"
      :data="image"
    />
    <div class="meta deemph">
      <div class="date dt-taken">
        {{ dateCreatedText }}
      </div>
      <div class="location">
        {{ location }}
      </div>
      <div class="categories">
        <span
          v-for="category in photo.categories"
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
        <g-link :to="seriesBasePath + seriesTitle" class="nodeco post-series">
             ❈ {{ seriesTitle }}
          </g-link>
      </div>
    </div>

    <div v-html="contentAsHtml" class="content para spacious">
    </div>
  </div>
</template>

<page-query>
query Photo ($slug: String!) {
  cms {
    photos(where: { slug: $slug }) {
      id
      title
      slug
      description
      content
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
      date
      location {
        landmark
        city
        state_province
        country
      }
    }
  }
}
</page-query>

<script>
import IconGoBackOrUp from '~/components/IconGoBackOrUp'
import Content from '~/components/Content'
import ResponsiveImage from '~/components/ResponsiveImage'

import { getCmsMedia } from '~/utils/medias'
import { getMetaTags } from '~/utils/meta-tags'
import { parseAsHtml } from '~/utils/parser'
import date from '@/mixins/date.js'
import goBackOrUp from '@/mixins/go-back-or-up.js'


export default {
  name: 'Photo',
  mixins: [date, goBackOrUp],
  components: {
    IconGoBackOrUp,
    Content,
    ResponsiveImage,
  },
  mounted() {
  },
  metaInfo() {
    return getMetaTags(this.photo, this.$route) 
  },
  computed: {
    photo() {
      return this.$page.cms.photos[0] || {}
    },
    image() {
      return this.photo.photo
    },
    categoryBasePath() {
      return '/p/photos/c/'
    },
    seriesBasePath() {
      return '/p/photos/s/'
    },
    seriesTitle() {
      const series = this.photo.series
      return series && series.title
    },
    location() {
      const loc = this.photo.location
      return (loc.landmark ? loc.landmark + " ⚐ " : "")
        + (loc.city ? loc.city + ", " : "") 
        + (loc.state_province ? loc.state_province + ", " : "") 
        + (loc.country ? loc.country : "") 
    },
    dateCreatedText() {
      let opts = {shortForm:true, showYear:true};
      let text = this.formattedDate(this.photo.date, opts);
      return text;
    },
    datePublishedText() {
      let opts = {shortForm:true, showYear:true};
      let text = this.formattedDate(this.photo.createdAt, opts);
      return text;
    },
    contentAsHtml() {
      const content = this.photo.content ? this.photo.content : ""
      return content ? 
        parseAsHtml(content, {
          paraClassName: "margin-top-small", 
          imgClassName:"rtimg", 
          extLinkClassName:"ext",
          extLinkIconClassName:"icon-Outbound deemph"
        }, getCmsMedia) : "";
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