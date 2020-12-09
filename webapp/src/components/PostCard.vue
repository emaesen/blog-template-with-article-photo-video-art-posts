<template>
  <div :class="['post-card h-entry', asClass]">
    <g-link :to="postBasePath + post.slug" class="nodeco u-url u-uid">
      <div class="post-summary">
        <div class="post-image-container">
          <g-image
            :alt="post.title"
            :src="imageSrc"
            class="post-image img-fluid"
          />
          <span :class="{'post-badge':mainCategory}">{{ mainCategory }}</span>
        </div>
        <h3 class="post-title p-name">
          {{ post.title }}
        </h3>
        <div class="post-description p-summary">
          {{ post.description }}
        </div>
      </div>
    </g-link>
    <div class="post-meta">
      <div class="post-date dt-published">
        {{ dateText }}
      </div>
      <div class="post-categories">
        <span
          v-for="category in post.categories"
          :key="category.id"
          class="post-category p-category"
        >
          {{ category.title }}
        </span>
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
      const url = (post.coverImage && post.coverImage.url) ||
      (post.photo && post.photo.url)
      return getCmsMedia(url)
    },
    mainCategory() {
      const mainCat = this.post.categories[0]
      return mainCat && mainCat.title
    },
    dateText() {
      let opts = {shortForm:true, showYear:true};
      let text = this.formattedDate(this.post.date || this.post.createdAt, opts);
      return text;
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
.post-category {
  font-size: 0.9em;
  opacity: 0.6;
  margin-right: 1em;
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