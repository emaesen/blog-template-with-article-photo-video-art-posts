<template>
  <div :class="['post-card h-entry', asClass]">
    <g-link :to="postBasePath + post.slug" class="nodeco u-url u-uid">
      <div class="post-summary">
        <div v-if="imageSrc" class="post-image-container">
          <g-image
            :alt="post.title"
            :src="imageSrc"
            class="post-image img-fluid"
          />
          <span :class="{'post-badge':postSeries}">{{ postSeries }}</span>
        </div>
        <h3 v-if="post.title" class="post-title p-name">
          {{ post.title }}
        </h3>
        <div v-if="post.description" class="post-description p-summary">
          {{ post.description }}
        </div>
        <div v-if="post.text" class="post-text p-summary">
          {{ post.text }}
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
          #{{ category.title }}
        </span>
      </div>
      <div v-if="showPostType" class="post-type">
        {{ post.type }}
      </div>
      <div v-if="post.thread" class="post-thread">
        {{ post.thread.title }}
      </div>
    </div>
  </div>
</template>

<script>
import { getCmsMedia } from '~/utils/medias'
import date from '@/mixins/date.js'

export default {
  props: {
    post: Object,
    postType: String,
    postsType: String,
  },
  mixins: [date],
  methods: {
    getCmsMedia,
  },
  computed: {
    postBasePath() {
      return `/p/${this.postType}s/`
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
      let opts = {shortForm:true, showYear:true};
      let text = this.formattedDate(this.post.date || this.post.createdAt, opts);
      return text;
    },
    showPostType() {
      // show the type of post if we are on an aggregate page
      return this.postsType && this.postType +"s" !== this.postsType
    }
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
  border: 1px solid var(--color_border_accent-2);
  background-color: var(--color_bg_accent-2);
  transition: all .3s ease-in-out;
  filter: brightness(.9);
}
.post-card:hover {
  opacity:1;
  filter: brightness(1);
}
.post-title {
  margin: 0;
}
.post-image-container {
  position: relative;
}
.post-image {
  border: 1px solid var(--color_border_accent-2);
  border-radius: 5px;
}
.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.post-type,
.post-thread,
.post-category {
  font-size: 0.9em;
  opacity: 0.9;
  margin-left: 1em;
  font-style: italic;
}
.post-badge {
  font-size: 0.9em;
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
  .post-card {
  flex: 0 0 100%;
  max-width: 100%;
  }
}

</style>