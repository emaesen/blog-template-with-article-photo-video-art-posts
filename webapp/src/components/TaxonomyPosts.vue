<template>
  <div>
    <div id="top" class="reserve-space">
      <div
        v-if="showUpDownToggle"
        @click="onClickUpDownToggle"
        class="up-down-selector"
      >
        <IconSwitchUpDown
          :selected="upDownSelection"
        />
      </div>
      <div class="rowsize-slider">
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
    </div>

    <div class="h-feed">
      <transition-group name="list" tag="div" class="cards-container">
        <PostCard
          v-for="post in posts"
          :key="post.id"
          :post="post"
          :postType="post.type"
          :postsType = "postsType"
          :nrPostsInRow="1*nrPostsInRow"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import PostCard from '~/components/PostCard'
import IconRange5 from '~/components/IconRange5'
import IconSwitchUpDown from '~/components/IconSwitchUpDown'

import windowSize from '@/mixins/window-size.js'

export default {
  name: 'TaxonomyPosts',
  mixins: [windowSize],
  props: {
    posts: Array,
    postsType: String,
  },
  data() {
    return {
      nrPostsInRow: 3,
      maxNrPostsInRow: 5,
      showUpDownToggle: false,
      sortSelections: ["down", "up"],
      sortSelectionIndex: 0,
    }
  },
  components: {
    PostCard,
    IconRange5,
    IconSwitchUpDown,
  },
  mounted() {
    this.setRowData()
    this.showUpDownToggle = this.nrPosts > 2
  },
  computed: {
    upDownSelection() {
      return this.sortSelections[this.sortSelectionIndex]
    },
    nrPosts() {
      return this.posts.length
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
      if (this.postsType==="articles") this.nrPostsInRow = 1
    },
    onClickUpDownToggle() {
      let si = this.sortSelectionIndex + 1
      if (si >= this.sortSelections.length) si = 0
      this.sortSelectionIndex = si
      this.posts = this.posts.reverse()
    }
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
@import "~/assets/styles/transi.less";
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