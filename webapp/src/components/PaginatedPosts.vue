<template>
  <div>
    <div id="top" class="rowsize-slider reserve-space">
      <div
        class="row-selection-range"
        title="choose how many items to show per row"
      >
        <IconRange5
          ref="rowSelectionRange"
          :rangeNr="1*nrPostsInRow"
          :maxRangeNr="maxNrPostsInRow"
        />
      </div>
      <input id="rowsizeslider" type="range"
        min="1"
        :max="maxNrPostsInRow"
        step="1"
        v-model="nrPostsInRow"
      />
    </div>


    <transition name="fade" mode="out-in" appear>
      <div :key="'page' + currentPage">
        <div class="page-counter" v-if="showPageCounter">
          {{ pageCounterText }}
        </div>
        <div :class="'h-feed page' + currentPage">
          <div class="cards-container">
            <PostCard
              v-for="post in posts"
              :key="post.id"
              :post="post"
              :postType="postType"
              :nrPostsInRow="1*nrPostsInRow"
            />
          </div>
        </div>
        <div class="page-counter" v-if="showPageCounter">
          {{ pageCounterText }}
        </div>
      </div>
    </transition>

    <Pagination 
      :basePath="basePath"
      :currentPage="currentPage"
      :totalPages="totalPages"
      hash="#top"
    />
  </div>
</template>

<script>
import Pagination from '~/components/Pagination'
import PostCard from '~/components/PostCard'
import IconRange5 from '~/components/IconRange5'

import windowSize from '@/mixins/window_size.js'

export default {
  name: 'PaginatedPosts',
  mixins: [windowSize],
  props: {
    posts: Array,
    postType: String,
    basePath: String,
    currentPage: Number,
    totalPages: Number,
  },
  data() {
    return {
      nrPostsInRow: 3,
      maxNrPostsInRow: 5,
    }
  },
  components: {
    Pagination,
    PostCard,
    IconRange5,
  },
  mounted() {
    this.setRowData()
  },
  computed: {
    showPageCounter() {
      return this.totalPages > 1
    },
    pageCounterText() {
      return "Page " + (1 + this.currentPage) + " of " + this.totalPages
    },
  },
  methods: {
    setRowData() {
      const ww = this.windowWidth
      if (ww < 450) {
        this.nrPostsInRow = 1
        this.maxNrPostsInRow = 3
      } else if (ww < 750) {
        this.nrPostsInRow = 2
        this.maxNrPostsInRow = 4
      } else if (ww < 1000) {
        this.nrPostsInRow = 3
        this.maxNrPostsInRow = 5
      } else if (ww > 1000) {
        this.nrPostsInRow = 4
        this.maxNrPostsInRow = 5
      }
    },
  },
  watch: {
    windowWidth() {
      // windowWidth is set/updated by the windowSize mixin on window resize
      this.setRowData()
    },
  },
}
</script>

<style lang="less" scoped>
@import '~/assets/styles/form.less';

.reserve-space {
  margin-top: -75px;
  padding-top: 75px;
}
.rowsize-slider {
  text-align: right;
  font-size: 85%;
  opacity: .7;
  margin-bottom: 1em;
  position: relative;
  input,
  .row-selection-range {
    position: absolute;
    right: 0;
    bottom:0;
    width: 7.5em;
    margin: 0;
    line-height: 0;
    vertical-align: middle;
  }
  input {
    opacity: 0;
    bottom: 6px;
  }
}
.page-counter {
  text-align: center;
  font-style: italic;
  margin-bottom: 1em;
  font-size: 85%;
  opacity: .7;
}

</style>