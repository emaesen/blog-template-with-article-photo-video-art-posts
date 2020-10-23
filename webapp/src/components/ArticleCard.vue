<template>
  <div class="article-card">
    <div class="article-summary">
      <g-link :to="'article/' + article.slug">
        <h3 class="">
          {{ article.title }}
        </h3>
      </g-link>
      <g-image
        :alt="article.title"
        :src="getCmsMedia(article.coverImage.url)"
        class="article-cover-image"
      />
      <div class="article-categories">
        <div
          v-for="category in article.categories"
          :key="category.id"
          class="article-category"
        >
          {{ category.title }}
        </div>
      </div>
      <p class="article-description">
        {{ article.description }}
      </p>
    </div>
    <g-link
      :to="'article/' + article.slug"
      :title="article.title"
      class="article-link"
    >
      Read more...
    </g-link>
  </div>
</template>

<script>
import { getCmsMedia } from '~/utils/medias'

export default {
  props: ['article'],
  methods: {
    getCmsMedia,
  }
}
</script>

<style lang="less" scoped>

.article-card {
  margin: 2em 0;
  padding: .5em 2em;
  border: 1px solid #ccc;
  background-color: #eee;
}
</style>