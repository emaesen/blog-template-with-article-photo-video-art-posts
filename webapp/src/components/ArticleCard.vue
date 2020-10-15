<template>
  <div class="">
    <g-link
      :to="'article/' + article.slug"
      class=""
    >
    <g-image
      :alt="article.title"
      :src="getCmsMedia(article.coverImage.url)"
      class=""
    />
    </g-link>
    <div class="">
      <div>
        <g-link :to="'article/' + article.slug">
          <h3 class="">
            {{ article.title }}
          </h3>
        </g-link>
        <div class="">
          <div
            v-for="category in article.categories"
            :key="category.id"
            class=""
          >
            {{ category.title }}
          </div>
        </div>
        <p>
          {{ article.description }}
        </p>
      </div>
      <g-link
        :to="'article/' + article.slug"
        :title="article.title"
        class=""
      >
        View article 👉
      </g-link>
    </div>
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