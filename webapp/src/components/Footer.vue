<template>
  <footer>
    <!-- Social network links -->
    <h6>{{ $static.cms.global.socialNetworksHeader }}</h6>
    <ul class="social">
      <li
        v-for="socialNetwork in $static.cms.global.socialNetworks" 
        :key="socialNetwork.id"
      >
        <a
          :href="socialNetwork.url"
          target="_blank"
          rel="noopener noreferrer"
          class="nowrap"
        >{{ socialNetwork.title }}</a>
      </li>
    </ul>

    <div class="legal layout-width">
      <span class="contact">{{ $static.cms.global.contactEmail }}</span>
      <span class="copyright">
        © {{ copyrightYear }} {{ $static.cms.global.siteName }}. {{ $static.cms.global.rightsText }}
      </span>
    </div>
  </footer>
</template>

<script>
import { getCmsMedia } from '~/utils/medias'

export default {
  methods: {
    getCmsMedia,
  },
  computed: {
    pages() {
      return [
        {
          title: 'Home',
          path: '/',
        },
        {
          title: 'About',
          path: '/about',
        },
      ]
    },
    copyrightYear() {
      const currentYear = new Date().getFullYear();
      const startYear = this.$static.cms.global.createdAt.substring(0,4)
      // TODO: add createAt as starting year in range
      return startYear < currentYear ? startYear + " - " + currentYear : currentYear
    }
  }
}
</script>

<static-query>
query Footer {
  cms {
    global {
      createdAt
      rightsText
      siteName
      contactEmail
      socialNetworksHeader
      socialNetworks {
        id
        url
        title
      }
    }
  }
}
</static-query>

<style lang="less" scoped>
ul.social {
  margin-bottom: 3em;
  list-style-type: none;
  margin-block-start:0;
  margin-block-end:3em;
  margin-inline-start:0;
  margin-inline-end:0;
  padding-inline-start: 0;
}
ul.social li {
  display: inline;
  margin-right: 2em;
}
.social-icon {
  max-width: 20px;
  margin-right: .2em;
  vertical-align: top;
}
.legal {
  position: fixed;
  width: 100%;
  bottom: 0;
  margin: auto;
  text-align: center;
  font-size: .75em;
  padding-top: 5px;
  border-top: 1px solid #0f5ca0;
  z-index: 999;
  background-color:#f5f2eadd;
}
</style>