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
query Meta {
  metadata {
    siteName
  }
}
</static-query>