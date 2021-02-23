<template>
  <li class="biography-item h-event">
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
    <div
      v-if="image"
      class="biography-image"
    >
      <ResponsiveImage
        :data="image"
      />
    </div>
  </li>
</template>

<script>
import RichText from '~/components/RichText'
import ResponsiveImage from '~/components/ResponsiveImage'
import date from '@/mixins/date.js'

export default {
  name: 'BiographyCard',
  props: {
    bioItem: Object,
  },
  mixins: [date],
  components: {
      RichText,
      ResponsiveImage,
  },
  computed: {
    image() {
      return this.bioItem.image
    }
  }
}
</script>

<style lang="less" scoped>
.biography-item {
  line-height: normal;
}

.biography-where {
  font-size: 0.9em;
  font-style: italic;
  opacity: 0.9;
}

.biography-when {
  font-size: 0.8em;
  font-style: italic;
  opacity: 0.8;
  white-space: nowrap;
}

.biography-image {
  margin-top: .5em;
}

@media screen and (max-width: 450px) {
  .biography-when {
    font-size: 0.7em;
    line-height: 1.9em;
  }
}
</style>