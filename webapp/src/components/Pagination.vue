<template>
  <div v-if="showNav" class="pagination-group">
    <g-link 
      :to="firstPath"
      :class="['action button nodeco first', {inactive: noFirst}]"
      title="first"
    >«</g-link>
    <g-link
      :to="prevPath"
      :class="['action button nodeco prev', {inactive: noFirst}]"
      title="previous"
    >‹</g-link>
    <g-link
      :to="nextPath"
      :class="['action button nodeco next', {inactive: noLast}]"
      title="next"
    >›</g-link>
    <g-link
      :to="lastPath"
      :class="['action button nodeco last', {inactive: noLast}]"
      title="last"
    >»</g-link>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    basePath: String,
    currentPage: Number,
    totalPages: Number,
    hash: String,
  },
  computed: {
    lastPage() {
      return this.totalPages - 1
    },
    firstPath() {
      return this.basePath + this.hash
    },
    prevPath() {
      if (this.currentPage <= 1) {
        return this.firstPath
      } else {
        return this.basePath + (this.currentPage - 1) + "/" + this.hash
      }
    },
    nextPath() {
      if (this.currentPage + 1 >= this.lastPage) {
        return this.lastPath
      } else {
        return this.basePath + (this.currentPage + 1) + "/" + this.hash
      }
    },
    lastPath() {
      return this.basePath + this.lastPage + "/" + this.hash
    },
    noFirst() {
      return this.currentPage == 0
    },
    noLast() {
      return this.currentPage == this.lastPage
    },
    showNav() {
      return this.totalPages > 1
    },
  }
}
</script>

<style lang="less" scoped>
.pagination-group {
  display: flex;
  justify-content: center;
}
a {
  font-size: 1.5em;
  line-height: inherit;
  padding: .05em .6em .1em;
  margin: 1em;
}
a.active {
  font-style: normal;
}
a.inactive {
  cursor: default;
  opacity: .3;
}
</style>