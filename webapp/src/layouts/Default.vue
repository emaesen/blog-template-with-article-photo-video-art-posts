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
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style>
h1,h2,h3,h4,h5,h6 {
  font-family: "Quando",serif;
  font-weight: 400;
}
h4,h5,h6 {
  font-weight: 800;
}
body {
  font-family: "Heebo","Helvetica Neue",Arial,sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
}

.layout {
  max-width: 760px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}
.nav__link {
  margin-left: 20px;
}

.para {
  margin-bottom: 1em;
}
blockquote {
  border-left: 3px solid  rgba(216, 199, 204, 0.6);
  padding-left: 1em;
  margin-left: 1em;
}
pre {
  padding: .2em 1em;
  margin: .2em 1em;
  background-color: rgb(199, 209, 216);
  border: 5px solid  rgba(216, 199, 204, 0.6);
  border-radius: .5em;
}
.boxed {
  padding: .2em 1em;
  border: 3px solid rgba(216, 199, 204, 0.6) ;
  border-radius: .5em;
  background-color: rgba(199, 209, 216, 0.27);
}

</style>
