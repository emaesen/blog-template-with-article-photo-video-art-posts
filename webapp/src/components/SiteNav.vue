<template>
  <nav class="nav">
    <g-link class="nav__link" to="/">Home</g-link>
    <g-link class="nav__link" to="/about/">About</g-link>
  </nav>
</template>

<static-query>
query SiteNav {
  metadata {
    siteName
  }
}
</static-query>

<style lang="less" scoped>
</style>