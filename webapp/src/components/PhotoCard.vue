<template>
  <div class="photo-card h-entry as-photo">
    <g-link :to="'/p/photos/' + photo.slug" class="nodeco u-url u-uid">
      <div class="photo-summary">
        <div class="photo-image-container">
          <g-image
            :alt="photo.title"
            :src="getCmsMedia(photo.photo.url)"
            class="photo-image img-fluid"
          />
          <span :class="{'photo-badge':mainCategory}">{{ mainCategory }}</span>
        </div>
        <h3 class="photo-title p-name">
          {{ photo.title }}
        </h3>
        <div class="photo-description p-summary">
          {{ photo.description }}
        </div>
      </div>
    </g-link>
    <div class="photo-meta">
      <div class="photo-date dt-taken">
        {{ dateText }}
      </div>
      <div class="photo-categories">
        <span
          v-for="category in photo.categories"
          :key="category.id"
          class="photo-category p-category"
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
  props: ['photo'],
  mixins: [date],
  methods: {
    getCmsMedia,
  },
  computed: {
    mainCategory() {
      const mainCat = this.photo.categories[0]
      return mainCat && mainCat.title
    },
    dateText() {
      let opts = {shortForm:true, showYear:true};
      let text = this.formattedDate(this.photo.date, opts);
      return text;
    }
  }
}
</script>

<style lang="less" scoped>
.photo-card {
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
.photo-card:hover {
  background-color: #c8ccc3aa;
}
.photo-title {
  margin: 0;
}
.photo-image-container {
  position: relative;
}
.photo-image {
  border: 1px solid #0f5ca0;
  border-radius: 5px;
}
.photo-category {
  font-size: 0.9em;
  color: #0f5ca0d0;
  margin-right: 1em;
}
.photo-badge {
  font-size: 0.9em;
  padding: .05em .3em;
  color: #eee;
  background-color: #0f5ca0b0;
  border-radius: 3px;
  position: absolute;
  bottom: 10px;
  right: 5px;
}
.photo-date {
  font-size: 0.8em;
  color: #737373;
}
@media screen and (max-width: 600px) {
  .photo-card {
  flex: 0 0 100%;
  max-width: 100%;
  }
}

</style>