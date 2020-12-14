<template>
  <div class="main-note h-entry as-note">
    

    <span  @click="goBackOrUp">
      <IconGoBackOrUp :title="goBackOrUpText"/>
    </span>


    <div class="text para">
      {{ note.text }}
    </div>

    <div class="meta deemph">
      <div class="date dt-taken">
        {{ dateText }}
      </div>
      <div class="thread">
        {{ threadText }}
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
    this.slug = this.$route.params.slug
  },
  metaInfo() {
    return getMetaTags(this.note) 
  },
  computed: {
    note() {
      return this.$page.cms.notes.filter(note => note.slug === this.slug)[0]
    },
    dateText() {
      let opts = {shortForm:true, showYear:true};
      let text = this.formattedDate(this.note.createdAt, opts);
      return text;
    },
    threadText() {
      return this.note.thread && this.note.thread.title
    },
  },
  methods: {
    getCmsMedia,
  }
}
</script>

<style lang="less" scoped>
.main-note {
  max-width: 300px;
  margin: 0 auto;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid var(--color_border_accent-2);
}
.meta {
  text-align: center;
  font-style: italic;
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