<template>
  <div>
    <a 
      :href="$url(firstPath)"
      :class="['nav nodeco first', {inactive: noFirst}]"
      title="first"
    >«</a>
    <a
      :href="$url(prevPath)"
      :class="['nav nodeco prev', {inactive: noFirst}]"
      title="previous"
    >‹</a>
    <a
      :href="$url(nextPath)"
      :class="['nav nodeco next', {inactive: noLast}]"
      title="next"
    >›</a>
    <a
      :href="$url(lastPath)"
      :class="['nav nodeco last', {inactive: noLast}]"
      title="last"
    >»</a>
  </div>
</template>

<script>
export default {
  props: {
    basePath: String,
    currentPage: Number,
    totalPages: Number
  },
  computed: {
    lastPage() {
      return this.totalPages - 1
    },
    firstPath() {
      return this.basePath
    },
    prevPath() {
      if (this.currentPage <= 1) {
        return this.firstPath
      } else {
        return this.basePath + (this.currentPage - 1)
      }
    },
    nextPath() {
      if (this.currentPage + 1 >= this.lastPage) {
        return this.lastPath
      } else {
        return this.basePath + (this.currentPage + 1)
      }
    },
    lastPath() {
      return this.basePath + this.lastPage
    },
    noFirst() {
      return this.currentPage == 0
    },
    noLast() {
      return this.currentPage == this.lastPage
    },
  }
}
</script>

<style lang="less" scoped>
a {
  font-size: 2em;
  line-height: 1em;
  padding: .05em .6em;
  margin: 1em;
  border: 2px solid #ccc;
}
a.inactive {
  cursor: default;
  opacity: .3;
}
</style>