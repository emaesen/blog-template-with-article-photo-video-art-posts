<template>
  <div class="main-video h-entry as-video">
    
    <h1>
      <span  @click="goBackOrUp">
        <IconGoBackOrUp :title="goBackOrUpText"/>
      </span>
      {{ video.title }}
    </h1>
    <g-image
      :alt="video.title"
      :src="imgUrl"
    />
    <div class="meta deemph">
      <div class="date dt-taken">
        {{ dateText }}
      </div>
      <div class="location">
        {{ location }}
      </div>
      <div class="categories">
        <span
          v-for="category in video.categories"
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

    <div class="description para spacious">
      {{ video.description }}
    </div>
  </div>
</template>

<page-query>
query Video ($slug: String!) {
  cms {
    videos(where: { slug: $slug }) {
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
      video {
        id
        url
      }
      date
    }
  }
}
</page-query>

<script>
import IconGoBackOrUp from '~/components/IconGoBackOrUp'
import Content from '~/components/Content'
import { getCmsMedia } from '~/utils/medias'
import { getMetaTags } from '~/utils/meta-tags'
import date from '@/mixins/date.js'
import goBackOrUp from '@/mixins/go-back-or-up.js'


export default {
  name: 'Video',
  mixins: [date, goBackOrUp],
  components: {
    IconGoBackOrUp,
    Content,
  },
  mounted() {
  },
  metaInfo() {
    return getMetaTags(this.video) 
  },
  computed: {
    video() {
      return this.$page.cms.videos[0]
    },
    imgUrl() {
      const url=this.video.video.url
      return getCmsMedia(url)
    },
    categoryBasePath() {
      return '/p/videos/c/'
    },
    seriesBasePath() {
      return '/p/videos/s/'
    },
    seriesTitle() {
      const series = this.video && this.video.series
      return series && series.title
    },
    location() {
      const loc = this.video.location
      return (loc.landmark ? loc.landmark + " ⚐ " : "")
        + (loc.city ? loc.city + ", " : "") 
        + (loc.state_province ? loc.state_province + ", " : "") 
        + (loc.country ? loc.country : "") 
    },
    dateText() {
      let opts = {shortForm:true, showYear:true};
      let text = this.formattedDate(this.video.date, opts);
      return text;
    },
  },
  methods: {
    getCmsMedia,
  },
}
</script>

<style lang="less" scoped>
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