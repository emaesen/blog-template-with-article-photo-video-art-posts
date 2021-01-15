<template>
  <div class="main-video h-entry as-video">
    
    <h1>
      <span  @click="goBackOrUp">
        <IconGoBackOrUp :title="goBackOrUpText"/>
      </span>
      {{ video.title }}
    </h1>
    <div class="date dt-published">
      {{ datePublishedText }}
    </div>
    
    <VideoEl :video="video" class="video-outer-container"/>

    <div class="meta deemph">
      <div class="date dt-taken">
        {{ dateCreatedText }}
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

    <div v-html="contentAsHtml" class="content para spacious">
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
      content
      video {
        id
        url
        mime
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
    return getMetaTags(this.video, this.$route) 
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
    dateCreatedText() {
      let opts = {shortForm:true, showYear:true};
      let text = this.formattedDate(this.video.date, opts);
      return text;
    },
    datePublishedText() {
      let opts = {shortForm:true, showYear:true};
      let text = this.formattedDate(this.video.createdAt, opts);
      return text;
    },
    contentAsHtml() {
      const content = this.video && this.video.content ? this.video.content : ""
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
    getCmsMedia,
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
.video-outer-container {
  max-width: 693px;
  margin: auto;
}
</style>