<template>
  <header class="">
    <div class="">
      <g-link to="/" class="">
        {{ $static.metadata.siteName }}
      </g-link>
      <nav class="">
        <g-link class="" to="/about/">About</g-link>
      </nav>
    </div>
  </header>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>