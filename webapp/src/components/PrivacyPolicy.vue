<template>
  <RichText
    :data="global.privacyPolicy"
    class="privacy_policy"
  />
</template>

<script>
import RichText from '~/components/RichText'

export default {
  name: 'PrivacyPolicy',
  components: {
    RichText,
  },
  computed: {
    global() {
      return this.$static.cms.global || {}
    }
  }
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