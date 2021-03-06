<template>
  <section v-if="hasPosts" class="h-feed anima__reveal-through-flip__container">

    <div class="cards-header-container">

      <div>
        <div
          v-if="showSelectionToggle"
          @click="cycleSelectionType"
          class="selection-type-toggle nojs-hide"
          title="toggle latest or featured"
        >
          <IconSwitchLF
            :selected="selectedType"
          />
        </div>

        <transition
          name="fade"
          mode="out-in"
        >
          <h2
            :key="selectionIndex"
            class="cards-header p-name"
          >
            {{ headerText }}
          </h2>
        </transition>
      </div>

      <transition
        name="fade"
        mode="out-in"
      >
        <a 
          v-if="showViewAllLink"
          class="cards-action action button nodeco" :href="postsBasePath"
        >
          {{ viewAllText }}
        </a>
      </transition>

    </div>

    <div
      :ref="postType+'-list-container'"
      :id="postType+'-list-container'"
      class="card-list-container anima__reveal-through-flip-down"
      v-animate-on-intersection
    >
      <transition-group
        name="flexlist"
        tag="div"
        :ref="postType+'-list'"
        :id="postType+'-list'"
        class="cards-container flexlist-container"
      >
        <PostCard
          v-for="post in selectedPosts"
          :key="post.id"
          :post="post"
          :postType="postType"
          class="flexlist-item"
          :nrPostsInRow="1*nrPostsInRow"
        />
      </transition-group>
    </div>
  </section>
</template>


<script>
import PostCard from '~/components/PostCard'
import RichText from '~/components/RichText'
import IconSwitchLF from '~/components/IconSwitchLF'
import {
  persistSelectionIndex,
  retrieveSelectionIndex,
  clearSelectionIndex
} from "~/utils/persistence.js"

import windowSize from '@/mixins/window-size.js'
import animateOnIntersection from '~/mixins/animate-on-intersection.js'

export default {
  name: 'SelectedPosts',
  props: {
    latestPosts: Array,
    featuredPosts: Array,
    totalNrOfPosts: Number,
    postType: String,
    postsType: String,
    postDisplayName: String,
    postsDisplayName: String,
  },
  mixins: [windowSize, animateOnIntersection],
  components: {
    PostCard,
    RichText,
    IconSwitchLF,
  },
  data() {
    return {
      nrPostsInRow: 3,
      maxNrPostsInRow: 5,
      selectionTypes: ["latest", "featured"],
      selectionIndex: 1
    }
  },
  created() {
    // show featured posts by default unless 
    // - they are not available
    // - they are the same as the latest posts
    this.selectionIndex = (this.featuredPosts.length === 0 || !this.hasDistinctFeaturedPosts)? 0 : 1
  },
  mounted() {
    this.init()
  },
  computed: {
    selectedType() {
      return this.selectionTypes[this.selectionIndex]
    },
    selectedPosts() {
      return this[this.selectedType+"Posts"]
    },
    postsBasePath() {
      return '/p/' + this.postsType + '/'
    },
    headerText() {
      return this.toTitleCase(this.selectedType) + " " + this.postsDisplayName
    },
    viewAllText() {
      return "view all " + this.totalNrOfPosts + " " + this.postsDisplayName
    },
    viewAlternateSelectedText() {
      let si = this.selectionIndex + 1
      if (si >= this.selectionTypes.length) si = 0
      const nextInCycle = this.selectionTypes[si]
      return "view " + nextInCycle
    },
    nrOfDisplayedPosts() {
      return this.selectedPosts.length
    },
    hasPosts() {
      return this.totalNrOfPosts > 0
    },
    hasDistinctFeaturedPosts() {
      return this.featuredPosts.length > 0 && !this.shareSamePosts(this.featuredPosts, this.latestPosts)
    },
    showSelectionToggle() {
      // only show the latest/featured selection toggle if there are 
      // featured posts, and the featured posts differ from the latest
      // posts
      return this.hasDistinctFeaturedPosts
    },
    showViewAllLink() {
      // only show the "view all posts" link if the are more posts than
      // currently displayed
      return this.totalNrOfPosts > this.nrOfDisplayedPosts
    }
  },
  methods: {
    init() {
      if (this.hasPosts) {
        this.setSelectionIndex(retrieveSelectionIndex(this.postType, this.selectionIndex))
      }
      this.setRowData()
    },
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
    setSelectionIndex(ind) {
      this.selectionIndex = ind
      if (this.selectedPosts.length === 0) this.cycleSelectionType()
    },
    cycleSelectionType() {
      this.animateListHeight()
      let si = this.selectionIndex + 1
      if (si >= this.selectionTypes.length) si = 0
      this.selectionIndex = si
      persistSelectionIndex(this.postType, this.selectionIndex)
    },
    toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    },
    shareSamePosts(aPosts,bPosts) {
      if (aPosts.length !== bPosts.length) return false
      const aPostIDs = aPosts.map(x => x.id)
      const bPostIDs = bPosts.map(x => x.id)
      const uniquePostIDs = new Set([...aPostIDs, ...bPostIDs])
      if (uniquePostIDs.size === aPostIDs.length) return true
      return false
    },
    sortByDate(postA,postB) {
      let a, b, aDate, bDate
      if (this.showLatestOnTop) {
        a=postA
        b=postB
      } else {
        b=postA
        a=postB
      }
      aDate = a.createdAt
      bDate = b.createdAt
      return (new Date(bDate)).getTime() - (new Date(aDate)).getTime()
    },
    reverseSort() {
      this.showLatestOnTop = !this.showLatestOnTop
    },
    animateListHeight() {
      this.setListHeight()
      this.$nextTick(this.setListHeight)
      setTimeout(() => {
        this.setListHeight()
        setTimeout(() => {
          this.setListHeight({off:true})
        }, 2020)
      }, 10)
    },
    setListHeight(ops) {
      const elc = this.$refs[this.postType+'-list-container']
      const el = this.$refs[this.postType+'-list'].$el
      if (ops && ops.off) {
        elc.style.height = null
      } else {
        elc.style.height = (el.clientHeight) + "px"
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
@import "~/assets/styles/transi.less";
.card-list-container {
  transition: height .7s;
}

@media screen and (min-width: 400px) {
  .cards-action {
    margin-bottom: .2em;
  }
}
@media screen and (max-width: 400px) {
  .cards-action {
    width: min-content;
  }
}
</style>
