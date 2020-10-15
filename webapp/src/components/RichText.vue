<template>
  <div class="">
    <h2>{{data.sectionTitle}}</h2>
    <!--Markdown :source="data.content" class="" /--> {{ data.content }}
  </div>
</template>

<script>
//import Markdown from 'vue-markdown'

export default {
  props: ["data"],
  components: {
    //Markdown,
  }
}
</script>