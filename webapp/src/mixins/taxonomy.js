/* 
 * mixin for Category, Series and Thread pages
 */

export default {
  data() {
    return {
      showLatestOnTop: true
    }
  },
  computed: {
    cms() {
      return this.$page.cms
    },
    postsType() {
      const routeName = this.$route.name
      let postsType = routeName.replace("__p_","").replace("__","").split('_')[0];
      // note that postsType is plural: 
      // expect "posts", "articles", "photos" or "videos"
      return postsType
    },
    sortText() {
      return "Reverse sort order"
    },
    articles() {
      return this.getMatchedPosts("article")
    },
    photos() {
      return this.getMatchedPosts("photo")
    },
    videos() {
      return this.getMatchedPosts("video")
    },
    notes() {
      return this.getMatchedPosts("note")
    },
    posts() {
      return [].concat(this.articles, this.photos, this.videos, this.notes).sort((a,b) => this.sortByDate(a,b))
    },
  },
  methods: {
    getMatchedPosts(postsTypeSingular) {
      if (this.taxonomy && (this.postsType === postsTypeSingular+"s" || this.postsType === "posts")) {
        let posts = this.taxonomy[postsTypeSingular+"s"]
        posts.map(p => p.type=postsTypeSingular)
        return posts || []
      } else {
        return []
      }
    },
    sortByDate(postA,postB) {
      let a,b
      if (this.showLatestOnTop) {
        a=postA
        b=postB
      } else {
        b=postA
        a=postB
      }
      return (new Date(b.createdAt)).getTime() - (new Date(a.createdAt)).getTime()
    },
    reverseSort() {
      this.showLatestOnTop = !this.showLatestOnTop
    }
  },
}