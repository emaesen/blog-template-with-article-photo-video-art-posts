<template>
  <div class="">
    <h2>{{data.sectionTitle}}</h2>
    <div v-html="contentAsHtml"/>
  </div>
</template>

<script>
import { parseAsHtml } from '~/utils/parser'


export default {
  props: ["data"],
  components: {
  },
  computed: {
    contentAsHtml() {
      console.log({data:this.data})
      return this.data && this.data.content ? 
        parseAsHtml(this.data.content) : "";
    }
  }
}
</script>