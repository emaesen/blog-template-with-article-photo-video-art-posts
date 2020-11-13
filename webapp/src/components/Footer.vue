<template>
  <footer>
    <!-- Other website links -->
    <div class="social">
      <div
        v-for="list in websiteLists"
        :key="list.title"
      >
        <h6>{{ list.title }}</h6>
        <ul class="social">
          <li
            v-for="website in list.website" 
            :key="website.title"
          >
            <a
              :href="website.url"
              target="_blank"
              rel="noopener noreferrer"
              class="nowrap"
            >{{ website.title }}</a>
            <span class="description">
              {{ website.description }}
            </span>
          </li>
        </ul>
      </div>
    </div>

    <div class="legal expand bgcolor-opaque">
      <span class="copyright">
        © {{ copyrightYear }} {{ $static.cms.global.siteName }}. {{ $static.cms.global.rightsText }}
      </span>
    </div>
  </footer>
</template>

<static-query>
query Footer {
  cms {
    global {
      createdAt
      rightsText
      siteName
      contactEmail
      otherWebsites {
        title
        website {
          title
          url
          description
        }
      }
    }
  }
}
</static-query>

<script>
export default {
  methods: {
  },
  computed: {
    websiteLists() {
      return this.$static.cms.global.otherWebsites
    },
    copyrightYear() {
      const currentYear = new Date().getFullYear();
      const startYear = this.$static.cms.global.createdAt.substring(0,4)
      return startYear < currentYear ? startYear + " - " + currentYear : currentYear
    },
  }
}
</script>

<style lang="less" scoped>
footer {
  margin-top: 5em;
}
footer h6 {
  margin-top: 1.5em;
}
div.social {
  margin-bottom: 5em;
}
ul.social {
  margin-bottom: 0;
  list-style-type: none;
  margin-block-start:0;
  margin-block-end:0;
  margin-inline-start:0;
  margin-inline-end:0;
  padding-inline-start: 0;
}
ul.social li {
  display: block;
  margin-right: 2em;
  position: relative;
}
.description {
  margin-left: 1em;
}
.description::before {
  content: " ≻ ";
}
.legal {
  position: fixed;
  width: 100%;
  bottom: 0;
  text-align: center;
  font-size: .75em;
  padding-top: 5px;
  border-top: 1px solid #0f5ca0;
  z-index: 999;
  opacity: .9;
}
</style>