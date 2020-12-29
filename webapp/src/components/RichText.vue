<template>
  <div>
    <h2 v-if="title">{{title}}</h2>
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
    title() {
      return this.data && this.data.sectionTitle
    },
    contentAsHtml() {
      const content = this.data && this.data.content ? this.data.content : this.data
      return content ? 
        parseAsHtml(content, {
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
  margin: 1em 0 1.5em 0;
}
div.rtpara ul,
div.rtpara ol,
div.rtpara dl {
  margin: .5em 0 0 0;
}
div.rtpara ul ul,
div.rtpara ul ol,
div.rtpara ol ol,
div.rtpara ol ul {
  margin: -.1em 0 .1em 0;
}
img.rtimg {
  display: block;
  float:right;
  max-width: 50%;
  margin-left: .5em;
}
</style>
