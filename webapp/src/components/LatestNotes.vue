<template>
  <section v-if="hasNotes" class="h-feed">
    <div class="cards-header-container">
      <h2 class="cards-header p-name">
        Latest notes
      </h2>
      <a 
        v-if="showViewAllLink"
        class="append" href="/p/notes/"
      >view all {{ totalNrOfNotes }} notes</a>
    </div>
    <div class="cards-container">
      <PostCard
        v-for="note in latestNotes"
        :key="note.id"
        :post="note"
        postType="note"
      />
    </div>
  </section>
</template>

<static-query>
query LatestNotes($limit: Int = 6) {
  cms {
    # List notes
    latestNotes: notes(sort: "createdAt:desc" limit:$limit) {
      id
      text
      slug
      createdAt
      thread {
        title
      }
    }
    allNotes: notes {
    	slug
    }
  }
}
</static-query>

<script>
import PostCard from '~/components/PostCard'
import RichText from '~/components/RichText'
import { getCmsMedia } from '~/utils/medias'
import { getSeoMetaTags } from '~/utils/seo'

export default {
  methods: {
    getCmsMedia,
  },
  components: {
    PostCard,
    RichText,
  },
  data() {
    return {
    }
  },
  computed: {
    latestNotes() {
      // the maximum nr of notes to show is defined by `limit` in the 
      // graphql query
      return this.$static.cms.latestNotes
    },
    nrOfDisplayedNotes() {
      return this.latestNotes.length
    },
    hasNotes() {
      return this.nrOfDisplayedNotes > 0
    },
    totalNrOfNotes() {
      return this.$static.cms.allNotes.length
    },
    showViewAllLink() {
      return this.totalNrOfNotes > this.nrOfDisplayedNotes
    }
  }
}
</script>

<style lang="less" scoped>
.cards-header-container {
  margin-bottom: 1.5em;
  box-shadow: 0 2px 7px -4px var(--color_border_accent-2);
}
.cards-header {
  display: inline-block;
  margin-bottom: 0;
}
.cards-container {
  display: flex;
  flex-wrap: wrap;
  place-content: space-between;
}

</style>
