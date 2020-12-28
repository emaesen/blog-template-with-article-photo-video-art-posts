<template>
  <div class="main-video h-entry as-video">
    
    <h1>
      <span  @click="goBackOrUp">
        <IconGoBackOrUp :title="goBackOrUpText"/>
      </span>
      {{ video.title }}
    </h1>

    <VideoEl :video="video" class="video-outer-container"/>

    <div class="meta deemph">
      <div class="date dt-taken">
        {{ dateText }}
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

    <div v-html="descriptionAsHtml" class="description para spacious">
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
      publicationDate
    }
  }
}
</page-query>

<script>
import IconGoBackOrUp from '~/components/IconGoBackOrUp'
import VideoEl from '~/components/Video'
import Content from '~/components/Content'
import { getCmsMedia } from '~/utils/medias'
import { getMetaTags } from '~/utils/meta-tags'
import { parseAsHtml } from '~/utils/parser'
import date from '@/mixins/date.js'
import goBackOrUp from '@/mixins/go-back-or-up.js'


export default {
  name: 'Video',
  mixins: [date, goBackOrUp],
  components: {
    IconGoBackOrUp,
    VideoEl,
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
    dateText() {
      let opts = {shortForm:true, showYear:true};
      let text = this.formattedDate(this.video.date, opts);
      return text;
    },
    descriptionAsHtml() {
      const description = this.video && this.video.description ? this.video.description : ""
      return description ? 
        parseAsHtml(description, {
          paraClassName: "margin-top-small", 
          imgClassName:"rtimg", 
          extLinkClassName:"ext",
          extLinkIconClassName:"icon-Outbound deemph"
        }, getCmsMedia) : "";
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
.video-outer-container {
  max-width: 693px;
  margin: auto;
}
</style>