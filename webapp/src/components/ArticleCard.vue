<template>
  <div class="article-card h-entry as-article">
    <g-link :to="'/p/articles/' + article.slug" class="nodeco u-url u-uid">
      <div class="article-summary">
        <div class="article-image-container">
          <g-image
            :alt="article.title"
            :src="getCmsMedia(article.coverImage.url)"
            class="article-image img-fluid"
          />
          <span :class="{'article-badge':mainCategory}">{{ mainCategory }}</span>
        </div>
        <h3 class="article-title p-name">
          {{ article.title }}
        </h3>
        <div class="article-description p-summary">
          {{ article.description }}
        </div>
      </div>
    </g-link>
    <div class="article-meta">
      <div class="article-date dt-published">
        {{ dateText }}
      </div>
      <div class="article-categories">
        <span
          v-for="category in article.categories"
          :key="category.id"
          class="article-category p-category"
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
  props: ['article'],
  mixins: [date],
  methods: {
    getCmsMedia,
  },
  computed: {
    mainCategory() {
      const mainCat = this.article.categories[0]
      return mainCat && mainCat.title
    },
    dateText() {
      let opts = {shortForm:true, showYear:true};
      let text = this.formattedDate(this.article.createdAt, opts);
      return text;
    }
  }
}
</script>

<style lang="less" scoped>
.article-card {
  flex: 0 0 49%;
  max-width: 50%;
  position: relative;
  width: 100%;
  margin-bottom: 2em;
  line-height: normal;
  background-color: transparent;
  border-radius: 5px;
  border-bottom: 3px solid #c9c9c9;
  background-color: #cccccc88;
  transition: background-color .3s ease-in-out
}
.article-card:hover {
  background-color: #c8ccc3aa;
}
.article-title {
  margin: 0;
}
.article-image-container {
  position: relative;
}
.article-image {
  border: 1px solid #0f5ca0;
  border-radius: 5px;
}
.article-category {
  font-size: 0.9em;
  color: #0f5ca0d0;
  margin-right: 1em;
}
.article-badge {
  font-size: 0.9em;
  padding: .05em .3em;
  color: #eee;
  background-color: #0f5ca0b0;
  border-radius: 3px;
  position: absolute;
  bottom: 10px;
  right: 5px;
}
.article-date {
  font-size: 0.8em;
  color: #737373;
}
@media screen and (max-width: 600px) {
  .article-card {
  flex: 0 0 100%;
  max-width: 100%;
  }
}

</style>