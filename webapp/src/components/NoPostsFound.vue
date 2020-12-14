<template>
  <div class="center anima__zoom pnf">
    <p class="anima__flicker emph spaced_chars">NO POSTS FOUND</p>
    <p class="spaced_chars">---------</p>
    <p class="anima__slide-in-from-below anima__-delay1 spaced_chars">SO</p>
    <p class="anima__slide-in-from-below anima__-delay2 spaced_chars">SORRY</p>
    <p class="anima__slide-in-from-below anima__-delay3 spacious">
      The series you requested does not have any associated {{ postsType }}.<br>
      Please click any of the navigation links to continue.<br>
    </p>
  </div>
</template>

<script>
export default {
  name: "NoPostsFound",
  props: {
    postsType: String,
  }
}
</script>

<style lang="less" scoped>

</style>