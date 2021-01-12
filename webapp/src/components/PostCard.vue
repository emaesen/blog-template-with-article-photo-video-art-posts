<template>
  <div :class="['post-card h-entry', asClass]">
    <g-link :to="postBasePath + post.slug" class="nodeco u-url u-uid">
      <div class="post-summary">
        <div class="post-media-container">
          <g-image
            v-if="imageSrc && postType!=='video'"
            :alt="post.title"
            :src="imageSrc"
            class="post-image img-fluid"
          />
          <Video
            v-if="postType==='video'"
            :video="post"
          />
          <g-link :to="seriesBasePath + postSeries" class="nodeco">
            <span :class="{'post-series':postSeries}">
              {{ postSeries }}
            </span>
          </g-link>
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
    <div class="post-meta">
      <div class="post-date dt-published">
        {{ dateText }}
      </div>
      <div v-if="post.categories" class="post-categories">
        <span
          v-for="category in post.categories"
          :key="category.id"
          class="post-category p-category"
        >
          <g-link :to="categoryBasePath + category.title" class="nodeco">
            #{{ category.title }}
          </g-link>
        </span>
      </div>
      <div v-if="showPostType" class="post-type">
        {{ post.type }}
      </div>
      <div v-if="post.thread" class="post-thread">
        <g-link :to="threadBasePath + post.thread.title" class="nodeco">
          ❈ {{ post.thread.title }}
        </g-link>
      </div>
    </div>
  </div>
</template>

<script>
import Video from '~/components/Video'
import { getCmsMedia } from '~/utils/medias'
import date from '@/mixins/date.js'
import { parseAsHtml } from '~/utils/parser'

export default {
  props: {
    post: Object,
    postType: String,
    postsType: String,
  },
  mixins: [date],
  components: {
      Video,
  },
  methods: {
    getCmsMedia,
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
    imageSrc() {
      const post = this.post
      if (post.coverImage || post.photo) {
        const url = (post.coverImage && post.coverImage.url) ||
        (post.photo && post.photo.url)
        return getCmsMedia(url)
      }
    },
    postSeries() {
      const series = this.post && this.post.series
      return series && series.title
    },
    dateText() {
      let date = this.post.date || this.post.createdAt
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
  }
}
</script>

<style lang="less" scoped>
.post-card {
  flex: 0 0 49%;
  max-width: 50%;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.post-type,
.post-thread,
.post-category {
  font-size: 0.8em;
  opacity: 0.9;
  margin-left: 1em;
}
.post-series {
  font-size: 0.9em;
  font-weight: 400;
  padding: .05em .3em;
  color: #eee;
  background-color: #0f5ca0b0;
  border-radius: 3px;
  position: absolute;
  bottom: 10px;
  right: 5px;
}
.post-date {
  font-size: 0.8em;
  font-style: italic;
  opacity: 0.8;
}

@media screen and (max-width: 600px) {
  .post-card,
  .post-card.as-note {
    flex: 0 0 97%;
    max-width: 100%;
  }
  .post-card.as-note {
    width: 90%;
  }
}

</style>