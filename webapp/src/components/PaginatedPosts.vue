<template>
  <div>
    <transition name="fade" mode="out-in" appear>
      <div :key="'page' + currentPage">
        <div id="top" class="page-counter" v-if="showPageCounter">
          {{ pageCounterText }}
        </div>
        <div :class="'h-feed page' + currentPage">
          <div class="cards-container">
            <PostCard
              v-for="post in posts"
              :key="post.id"
              :post="post"
              :postType="postType"
            />
          </div>
        </div>
        <div id="top" class="page-counter" v-if="showPageCounter">
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

export default {
  name: 'PaginatedPosts',
  props: {
    posts: Array,
    postType: String,
    basePath: String,
    currentPage: Number,
    totalPages: Number,
  },
  components: {
    Pagination,
    PostCard,
  },
  computed: {
    showPageCounter() {
      console.log(this.totalPages)
      return this.totalPages > 1
    },
    pageCounterText() {
      return "Page " + (1 + this.currentPage) + " of " + this.totalPages
    },
  },
}
</script>

<style lang="less" scoped>
.page-counter {
  text-align: center;
  margin-top: -75px;
  padding-top: 75px;
  font-style: italic;
  margin-bottom: 1em;
  font-size: 85%;
  opacity: .7;
}

</style>