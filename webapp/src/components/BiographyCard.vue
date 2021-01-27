<template>
  <div class="biography-card h-entry">
    <h3
      v-if="biography.title"
      class="biography-title p-name"
    >
      {{ biography.title }}
    </h3>
    <div
      v-if="biography.description"
      class="biography-description p-summary"
    >
      <RichText :data="biography.description"/>
    </div>
  </div>
</template>

<script>
import RichText from '~/components/RichText'
import { getCmsMedia } from '~/utils/medias'
import date from '@/mixins/date.js'

export default {
  name: 'BiographyCard',
  props: {
    biography: Object,
    biographyType: String,
    biographysType: String,
  },
  mixins: [date],
  components: {
      RichText,
  },
  methods: {
    getCmsMedia,
  },
  computed: {
    dateText() {
      let date = this.biography.createdAt
      if (date) {
        let opts = {shortForm:true, showYear:true};
        let text = this.formattedDate(date, opts);
        return text;
      }
    },
  }
}
</script>

<style lang="less" scoped>
.biography-card {
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

.biography-title {
  margin: 0;
}

.biography-date {
  font-size: 0.8em;
  font-style: italic;
  opacity: 0.5;
}

@media screen and (min-width: 1000px) {

}

@media screen and (max-width: 750px) {

}

@media screen and (max-width: 450px) {

}
</style>