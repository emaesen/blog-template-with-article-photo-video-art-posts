<template>
  <section v-if="hasPosts" class="h-feed">

    <div class="cards-header-container">

      <div>
        <div
          v-if="showSelectionToggle"
          @click="cycleSelectionType"
          class="selection-type-toggle"
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
          class="cards-action nodeco" :href="postsBasePath"
        >
          {{ viewAllText }}
        </a>
      </transition>

    </div>

    <transition-group
      name="flexlist"
      tag="div"
      class="cards-container flexlist-container"
    >
      <PostCard
        v-for="post in selectedPosts"
        :key="post.id"
        :post="post"
        :postType="postType"
        class="flexlist-item"
      />
    </transition-group>

  </section>
</template>


<script>
import PostCard from '~/components/PostCard'
import RichText from '~/components/RichText'
import IconSwitchLF from '~/components/IconSwitchLF'

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
  mixins: [],
  components: {
    PostCard,
    RichText,
    IconSwitchLF,
  },
  data() {
    return {
      selectionTypes: ["latest", "featured"],
      selectionIndex: 1
    }
  },
  created() {
    // show featured posts by default unless they are not available
    this.selectionIndex = (this.featuredPosts.length === 0)? 0 : 1
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
    viewSelectedText() {
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
    showSelectionToggle() {
      // only show the latest/featured selection toggle if there are 
      // featured posts, and the featured posts differ from the latest
      // posts
      return this.featuredPosts.length > 0 && !this.shareSamePosts(this.featuredPosts, this.latestPosts)
    },
    showViewAllLink() {
      // only show the "view all posts" link if the are more posts than
      // currently displayed
      return this.totalNrOfPosts > this.nrOfDisplayedPosts
    }
  },
  methods: {
    cycleSelectionType() {
      let si = this.selectionIndex + 1
      if (si >= this.selectionTypes.length) si = 0
      this.selectionIndex = si
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
  },
}
</script>

<style lang="less" scoped>
@import "~/assets/styles/transi.less";

</style>
