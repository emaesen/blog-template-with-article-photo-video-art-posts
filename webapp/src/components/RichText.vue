<template>
  <div class="">
    <h2>{{data.sectionTitle}}</h2>
    <div v-html="contentAsHtml"/>
  </div>
</template>

<script>
import { getCmsMedia } from '~/utils/medias'
import { parseAsHtml } from '~/utils/parser'


export default {
  props: ["data"],
  components: {
  },
  computed: {
    contentAsHtml() {
      return this.data && this.data.content ? 
        parseAsHtml(this.data.content, {
          paraClassName: "rtpara", 
          imgClassName:"rtimg", 
          extLinkClassName:"ext",
          extLinkIconClassName:"icon-Outbound deemph"
        }, getCmsMedia) : "";
    }
  }
}
</script>

<style lang="less">
div.rtpara {
  margin-bottom: 1em;
}
img.rtimg {
  display: block;
  float:right;
  max-width: 50%;
  margin-left: .5em;
}
</style>
