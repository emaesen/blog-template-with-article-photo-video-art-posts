<template>
  <div class="layout">
    <header class="header">
      <strong>
        <g-link to="/">
          <g-image alt="Logo" src="~/assets/images/logo.png" width="65" />
        </g-link>
      </strong>
      <nav class="nav">
        <g-link class="nav__link" to="/">Home</g-link>
        <g-link class="nav__link" to="/about/">About</g-link>
      </nav>
    </header>
    <slot/>
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
import Footer from '~/components/Footer'

export default {
  components: {
    Footer,
  },
}
</script>

<style>
@import "../assets/styles/app.less"

</style>
