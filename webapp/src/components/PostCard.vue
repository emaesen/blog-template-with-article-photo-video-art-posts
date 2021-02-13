<template>
  <div :class="['post-card h-entry', asClass, nrPostsInRowClass, spacingClass]">
    <g-link :to="postBasePath + post.slug" class="nodeco u-url u-uid">
      <div class="post-summary">
        <div class="post-media-container">
          <g-image
            v-if="imageSrc && postType!=='video'"
            :alt="post.title"
            :src="imageSrc"
            class="post-image img-fluid u-photo"
          />
          <Video
            v-if="postType==='video'"
            :video="post"
          />
        </div>
        <h3 v-if="post.title" :class="['post-title p-name', {nodesc:!post.description}]">
          {{ post.title }}
        </h3>
        <div v-if="post.description" class="post-description p-summary">
          {{ post.byline || post.description }}
        </div>
        <div v-if="post.text"  v-html="textAsHtml" class="post-text p-summary cursive">
        </div>
      </div>
    </g-link>
    <aside class="post-meta">
      <div class="post-date dt-published meta-col">
        {{ dateText }}
      </div>
      <div class="meta-col">
        <div v-if="postSeries" class="post-categories">
          <g-link 
            :to="seriesBasePath + postSeries"
            class="nodeco"
            rel="tag"
            :title="'click to view ' + postSeries + ' series'"
          >
            <span class="post-series p-category">
              ❈{{ postSeries }}
            </span>
          </g-link>
        </div>
        <div v-if="post.categories" class="post-categories">
          <span
            v-for="category in post.categories"
            :key="category.id"
            class="post-category"
          >
            <g-link
              :to="categoryBasePath + category.title"
              class="nodeco p-category"
              rel="tag"
              :title="'click to view ' + category.title + ' category'"
            >
              #{{ category.title }}
            </g-link>
          </span>
        </div>
        <div v-if="showPostType" class="post-type">
          {{ post.type }}
        </div>
        <div v-if="post.thread" class="post-thread">
          <g-link
            :to="threadBasePath + post.thread.title"
            class="nodeco p-category"
            rel="tag"
            :title="'click to view ' + post.thread.title + ' thread'"
          >
            ❈ {{ post.thread.title }}
          </g-link>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import Video from '~/components/Video'
import { getCmsMedia } from '~/utils/medias'
import { parseAsHtml } from '~/utils/parser'

import date from '@/mixins/date.js'
import windowSize from '@/mixins/window-size.js'

export default {
  name: 'PostCard',
  props: {
    post: Object,
    postType: String,
    postsType: String,
    nrPostsInRow: Number,
  },
  data() {
    return {
      spacingClass: "",
      spacingThreshold: 250,
    }
  },
  mixins: [date, windowSize],
  components: {
      Video,
  },
  mounted() {
    this.setSpacingClass()
  },
  methods: {
    getCmsMedia,
    setSpacingClass() {
      const ww = this.windowWidth
      const cardWidth = ww / this.nrPostsInRow
      this.spacingClass = cardWidth > this.spacingThreshold ? 
                            "flex-meta" : ""
    }
  },
  computed: {
    postBasePath() {
      return `/p/${this.postType}s/`
    },
    categoryBasePath() {
      return this.postBasePath + '/c/'
    },
    seriesBasePath() {
      return this.postBasePath + '/s/'
    },
    threadBasePath() {
      return this.postBasePath + '/t/'
    },
    asClass() {
      return `as-${this.postType}`
    },
    nrPostsInRowClass() {
      return `row-${this.nrPostsInRow}`
    },
    imageSrc() {
      const post = this.post
      if (post.coverImage || post.photo || post.image) {
        const img = post.coverImage || post.photo || post.image
        return getCmsMedia(img && img.url)
      }
    },
    postSeries() {
      const series = this.post && this.post.series
      return series && series.title
    },
    dateText() {
      let date = this.post.createdAt
      if (date) {
        let opts = {shortForm:true, showYear:true};
        let text = this.formattedDate(date, opts);
        return text;
      }
    },
    showPostType() {
      // show the type of post if we are on an aggregate page
      return this.postsType && this.postType +"s" !== this.postsType
    },
    textAsHtml() {
      const text = this.post && this.post.text ? this.post.text : ""
      return text ? 
        parseAsHtml(text, {
          paraClassName: "margin-top-small", 
          imgClassName:"rtimg", 
          extLinkClassName:"ext",
          extLinkIconClassName:"icon-Outbound deemph"
        }, getCmsMedia) : "";
    },
  },
  watch: {
    windowWidth() {
      // windowWidth is set/updated by the windowSize mixin on window resize
      this.setSpacingClass()
    },
    nrPostsInRow() {
      this.setSpacingClass()
    }
  },
}
</script>

<style lang="less" scoped>
.post-card {
  flex: 0 0 32%;
  max-width: 31vw;
  position: relative;
  width: 100%;
  margin-bottom: 2em;
  line-height: normal;
  padding: 5px;
  border-radius: 5px;
  background-color: var(--color_bg);
  transition: all .3s ease-in-out;
  filter: brightness(0.98);
  opacity: .9;
  a.active--exact {
    font-weight: normal;
  }
}
.post-card.as-note {
  border: none;
  max-width: 600px;
  width: 70%;
  min-height: 5em;
  margin: 1em auto;
  padding: 1em 1em 2em 1em;
  border-radius: 5px;
  box-shadow: 1px 1px 3px  var(--color_border_accent-1);
  .post-meta {
    position: absolute;
    bottom: 0;
    right: 1em;
    left: 1em;
  }
}
.post-card:hover {
  opacity:1;
  filter: brightness(1.026);
}
html[data-color-mode=dark] .post-card:hover {
  filter: brightness(1.15);
  img {
    filter: brightness(.8);
  }
}
.post-title {
  margin: 0;
}
.post-media-container {
  position: relative;
}
.post-image {
  border: 1px solid var(--color_border_accent-2);
  border-radius: 5px;
}
.post-text {
  font-family: var(--font_family_cursive), cursive;
  font-size: 135%;
  line-height: normal;
  text-align: center;
}

.post-meta {
  margin-top: .3em;
}
.post-type,
.post-thread,
.post-series,
.post-category {
  font-size: 0.8em;
  opacity: 0.9;
  margin-left: 1em;
}
.post-thread,
.post-series,
.post-categories {
  text-align: right;
  line-height: 1em;
  margin-top: .3em;
}
.post-date {
  font-size: 0.8em;
  font-style: italic;
  opacity: 0.5;
}

.post-card.flex-meta {
  .post-meta {
    margin-top: .3em;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .meta-col {
    flex: 0 0 50%;
  }
}

@media screen and (max-width: 450px) {
  .post-card.as-note {
    width: 90%;
  }
}

.post-card.row-1 {
  flex: 0 0 100%;
  max-width: 100vw;
}
.post-card.as-note.row-1 {
  max-width: 95vw;
}

.post-card.row-2 {
  flex: 0 0 49%;
  max-width: 47vw;
}
.post-card.row-3 {
  flex: 0 0 32%;
  max-width: 31vw;
}
.post-card.row-4 {
  flex: 0 0 24%;
  max-width: 23vw;
  font-size: 90%;
}
.post-card.row-5 {
  flex: 0 0 19%;
  max-width: 18vw;
  font-size: 80%;
}

</style>