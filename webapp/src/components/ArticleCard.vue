<template>
  <div class="article-card">
    <g-link :to="'article/' + article.slug">
      <div class="article-summary">
        <div class="article-image-container">
          <g-image
            :alt="article.title"
            :src="getCmsMedia(article.coverImage.url)"
            class="article-cover-image img-fluid"
          />
          <span :class="{'article-badge':mainCategory}">{{ mainCategory }}</span>
        </div>
        <h3 class="article-title">
          {{ article.title }}
        </h3>
        <div class="article-description">
          {{ article.description }}
        </div>
      </div>
    </g-link>
    <div class="article-meta">
      <div class="article-date">
        {{ dateText }}
      </div>
      <div class="article-categories">
        <div
          v-for="category in article.categories"
          :key="category.id"
          class="article-category"
        >
          {{ category.title }}
        </div>
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
  flex: 0 0 50%;
  max-width: 50%;
  position: relative;
  width: 100%;
  margin-bottom: 2em;
  padding: .3em .5em;
  border: 1px solid #eee;
}
.article-title {
  margin: 0;
}
.article-image-container {
  position: relative;
  margin-bottom: .4em;
}
.article-cover-image {
  border: 1px solid #ccc;
  border-radius: 5px;
}
.article-badge {
  padding: .05em .3em;
  position: absolute;
  bottom: 10px;
  right: 5px;
  color: #eee;
  background-color: #0f5ca0;
  border-radius: 3px;
}
.article-date {
  font-size: 85%;
  color: #c5c5c5;
}
@media all and (max-width: 600px) {
  .article-card {
  flex: 0 0 100%;
  max-width: 100%;
  }
}

</style>