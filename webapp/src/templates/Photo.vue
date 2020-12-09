<template>
  <div class="main-photo h-entry as-photo">
    <h1>
      {{ photo.title }}
    </h1>
    <g-image
      :alt="photo.title"
      :src="imgUrl"
    />
    <div class="meta deemph">
      <div class="date dt-taken">
        {{ dateText }}
      </div>
      <div class="location">
        {{ location }}
      </div>
      <div class="categories">
        <span
          v-for="category in photo.categories"
          :key="category.id"
          class="category p-category"
        >
          {{ category.title }}
        </span>
      </div>
    </div>

    <div class="description para spacious">
      {{ photo.description }}
    </div>
  </div>
</template>

<page-query>
query Photo ($slug: String!) {
  cms {
    photos(where: { slug: $slug }) {
      id
      title
      slug
      description
      categories {
        id
        title
      }
      photo {
        id
        url
      }
      date
      location {
        landmark
        city
        state_province
        country
      }
    }
  }
}
</page-query>

<script>
import Content from '~/components/Content'
import { getCmsMedia } from '~/utils/medias'
import { getMetaTags } from '~/utils/meta-tags'
import date from '@/mixins/date.js'


export default {
  name: 'Photo',
  mixins: [date],
  methods: {
    getCmsMedia,
  },
  components: {
    Content,
  },
  metaInfo() {
    return getMetaTags(this.photo) 
  },
  computed: {
    photo() {
      return this.$page.cms.photos[0]
    },
    imgUrl() {
      const url=this.photo.photo.url
      return getCmsMedia(url)
    },
    location() {
      const loc = this.photo.location
      return (loc.landmark ? loc.landmark + " ⚐ " : "")
        + (loc.city ? loc.city + ", " : "") 
        + (loc.state_province ? loc.state_province + ", " : "") 
        + (loc.country ? loc.country : "") 
    },
    dateText() {
      let opts = {shortForm:true, showYear:true};
      let text = this.formattedDate(this.photo.date, opts);
      return text;
    },
  }
}
</script>

<style lang="less" scoped>
.meta {
  text-align: center;
  font-style: italic;
}
.category {
  font-size: 0.9em;
  opacity: 0.6;
  margin: 0 1em;
}
</style>