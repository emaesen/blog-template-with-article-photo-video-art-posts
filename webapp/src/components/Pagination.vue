<template>
  <div v-if="showNav" class="nav-group">
    <g-link 
      :to="firstPath"
      :class="['nav nodeco first', {inactive: noFirst}]"
      title="first"
    >«</g-link>
    <g-link
      :to="prevPath"
      :class="['nav nodeco prev', {inactive: noFirst}]"
      title="previous"
    >‹</g-link>
    <g-link
      :to="nextPath"
      :class="['nav nodeco next', {inactive: noLast}]"
      title="next"
    >›</g-link>
    <g-link
      :to="lastPath"
      :class="['nav nodeco last', {inactive: noLast}]"
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
        return this.basePath + (this.currentPage - 1) + "/"
      }
    },
    nextPath() {
      if (this.currentPage + 1 >= this.lastPage) {
        return this.lastPath
      } else {
        return this.basePath + (this.currentPage + 1) + "/"
      }
    },
    lastPath() {
      return this.basePath + this.lastPage + "/"
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
.nav-group {
  display: flex;
  justify-content: center;
}
a {
  font-size: 1.5em;
  line-height: inherit;
  padding: .05em .6em .1em;
  margin: 1em;
  background-color: var(--color_bg_accent-1);;
  box-shadow: 1px 1px 7px -3px var(--color_border_accent-1);
  border-radius: 7px;
}
a.inactive {
  cursor: default;
  opacity: .3;
}
</style>