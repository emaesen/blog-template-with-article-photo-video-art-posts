<template>
  <div class="layout">
    <header class="header">
      <strong>
        <g-link to="/">
          <g-image alt="Logo" src="~/assets/images/logo.png" width="65" />
        </g-link>
      </strong>
      <SiteNav/>
    </header>
    <transition name="fade" appear>
      <main>
        <slot/>
      </main>
    </transition>
    <Footer/>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import SiteNav from '~/components/SiteNav'
import Footer from '~/components/Footer'

export default {
  components: {
    SiteNav,
    Footer,
  },
}
</script>

<style lang="less">
@import "../assets/styles/app.less";

</style>
