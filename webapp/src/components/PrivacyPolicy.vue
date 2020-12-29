<template>
  <RichText
    :data="$static.cms.global.privacyPolicy"
    class="privacy_policy"
  />
</template>

<script>
import RichText from '~/components/RichText'

export default {
  components: {
    RichText,
  },
}
</script>

<static-query>
query PrivacyPolicy {
  cms {
    global {
      privacyPolicy
    }
  }
}
</static-query>

<style lang="less">
.privacy_policy {
  font-size: 85%;
  div.rtpara {
    margin: .2em 0 .5em 0;
  }
}
</style>