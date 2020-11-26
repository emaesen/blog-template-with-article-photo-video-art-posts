<template>
  <div>
    <div class="center anima__zoom pnf">
      <p class="anima__flicker emph spaced_chars">PAGE NOT FOUND</p>
      <p class="spaced_chars">---------</p>
      <p class="anima__slide-in-from-below delay1 spaced_chars">SO</p>
      <p class="anima__slide-in-from-below delay2 spaced_chars">SORRY</p>
      <p class="anima__slide-in-from-below delay3 spacious">
        The page you requested does not –or no longer– exist.<br>
        Please click any of the navigation links to continue.<br>
      </p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.pnf {
  margin: 10vh 0 60vh 0;
}
.spaced_chars {
  letter-spacing: .7em;
}
.delay1 {
  animation-delay: 1s;
}
.delay2 {
  animation-delay: 1.1s;
}
.delay3 {
  animation-delay: 2s;
}
</style>