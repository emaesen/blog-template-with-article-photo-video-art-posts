<template>
  <div>
    

    <span  @click="goBackOrUp">
      <IconGoBackOrUp :title="goBackOrUpText"/>
    </span>
    <div class="date dt-published">
      {{ dateText }}
    </div>

    <div  class="main-note h-entry as-note">
      <div v-html="textAsHtml" class="text para">
      </div>

      <div class="meta deemph">
        <div v-if="threadText" class="thread post-thread">
          <g-link :to="threadBasePath + note.thread.title" class="nodeco">
            ❈ {{ threadText }}
          </g-link>
        </div>
      </div>
    </div>
  </div>
</template>

<page-query>
query Note {
  cms {
    notes {
      id
      slug
      text
      createdAt
      thread {
        title
      }
    }
  }
}
</page-query>

<script>
import IconGoBackOrUp from '~/components/IconGoBackOrUp'
import Content from '~/components/Content'
import { getCmsMedia } from '~/utils/medias'
import { getMetaTags } from '~/utils/meta-tags'
import { parseAsHtml } from '~/utils/parser'
import date from '@/mixins/date.js'
import goBackOrUp from '@/mixins/go-back-or-up.js'


export default {
  name: 'Note',
  mixins: [date, goBackOrUp],
  components: {
    IconGoBackOrUp,
    Content,
  },
  created() {
    /* Unlike individual Article, Photo and Video pages,
     * individual Note pages are not pre-generated,
     * thus we need to query the URL
     * and find the right Note by filtering the full Notes array
     */
    this.slug = this.$route.params.slug || ""
  },
  metaInfo() {
    return getMetaTags(this.note, this.$route) 
  },
  computed: {
    note() {
      return this.$page.cms.notes.filter(note => note.slug === this.slug)[0] || {}
    },
    dateText() {
      let opts = {shortForm:true, showYear:true};
      let text = this.formattedDate(this.note.createdAt, opts);
      return text;
    },
    threadText() {
      return this.note.thread && this.note.thread.title
    },
    threadBasePath() {
      return '/p/notes/t/'
    },
    textAsHtml() {
      const text = this.note && this.note.text ? this.note.text : ""
      return text ? 
        parseAsHtml(text, {
          paraClassName: "margin-top-small", 
          imgClassName:"rtimg", 
          extLinkClassName:"ext",
          extLinkIconClassName:"icon-Outbound deemph"
        }, getCmsMedia) : "";
    },
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.main-note {
  max-width: 600px;
  width: 70%;
  margin: 1em auto;
  padding: 2em;
  border-radius: 5px;
  box-shadow: 1px 1px 3px  var(--color_border_accent-1);
}
.text {
  font-family: var(--font_family_cursive), cursive;
  font-size: 150%;
  line-height: normal;
  text-align: center;
}
.meta {
  text-align: center;
}
.date {
  font-size: 0.8em;
  font-style: italic;
  opacity: 0.8;
}
.thread {
  font-size: 0.9em;
  opacity: 0.9;
}
</style>