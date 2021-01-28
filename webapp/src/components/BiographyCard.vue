<template>
  <div class="biography-card h-event">
    <div
      v-if="bioItem.when"
      class="biography-when dt-start"
    >
      {{ bioItem.when }}
    </div>
    <div
      v-if="bioItem.where"
      class="biography-where p-location"
    >
      {{ bioItem.where }}
    </div>
    <div
      v-if="bioItem.what"
      class="biography-what p-summary"
    >
      {{ bioItem.what }}
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
    bioItem: Object,
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
      let date = this.bioItem.createdAt
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

.biography-activity {
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