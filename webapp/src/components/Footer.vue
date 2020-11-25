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
              rel="me noopener noreferrer nofollow"
              class="nowrap u-url"
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
      <span
        class="version"
        @click="revealMadeBy"
      >{{ version }}</span>
    </div>

    <div class="madeby-container">
      <div
        ref="madeby"
        class="madeby"
      >
        <div>
          <a
            href="https://github.com/emaesen/blog-template-with-article-photo-video-posts"
            target="_blank"
            rel="noopener noreferrer nofollow"
            class="nodeco"
          >Website template</a><br>by <a
            href="https://epvm.name"
            target="_blank"
            rel="noopener noreferrer nofollow"
            class="nodeco"
          >Edward Maesen</a>.
        </div>
        <div
          class="close-icon"
          @click="hideMadeBy"
        >×</div>
      </div>
    </div>

  </footer>
</template>

<static-query>
query Footer {
  metadata {
    version
  }
  cms {
    global {
      createdAt
      rightsText
      siteName
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
  name: "Footer",
  data() {
    return {
      version: "",
    }
  },
  beforeMount() {
    const version = this.$static.metadata.version;
    if (this.isInStandaloneMode()) {
      // Site is running stand-alone as installed web App
      this.version = version + "-A";
    } else {
      // Site is running in web Browser
      this.version = version + "-B";
    }
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
    madeby() {
      return this.$refs.madeby
    }
  },
  methods: {
    isInStandaloneMode() {
      return (window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone)
    },
    revealMadeBy() {
      this.madeby.classList.add('reveal')
    },
    hideMadeBy() {
      this.madeby.classList.remove('reveal')
    },
  },
}
</script>

<style lang="less" scoped>
footer {
  margin-top: 5em;
  overflow: hidden;
  font-size: .9em;
  border-top: 1px solid var(--color_border_accent-1);
}
footer h6 {
  margin-top: 1.5em;
}
div.social {
  padding-bottom: 3em;
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
ul.social > li {
  display: block;
  margin-right: 2em;
  position: relative;
}
.description {
  margin-left: 1em;
  font-size: 90%;
  opacity: .6;
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
  border-top: 1px solid var(--color_border_accent-1);
  z-index: 999;
  opacity: .9;
}

.version {
  position: fixed;
  right: 5px;
  opacity: .6;
  cursor: pointer;
}

.madeby-container {
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 999;
}
.madeby {
  width: 8em;
  height: 8em;
  border: 5px solid var(--color_border_accent-1);
  border-radius: 8em 0 0 0;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  z-index: 4;
  background-color: var(--color_bg_opaque);
  font-size: 0.9em;
  line-height: 1.3em;
}
.madeby div {
   padding: 0 .3em .3em 0;
}
.madeby {
  position: absolute;
  bottom: 0;
  right: 0;
  transition: transform 1s cubic-bezier(1,-0.04,.81,1.32);
  transform-origin: bottom right;
  transform: rotate(90deg);
}
.madeby.reveal {
  transform: rotate(0);
}
.madeby .close-icon {
  cursor: pointer;
  font-size: 2em;
  line-height: 1em;
  padding: 0;
  margin: 0;
  position: absolute;
  left: 5px;
  bottom: 0;
}

@media (prefers-reduced-motion: no-preference) {
  /* fancy description */
  .description {
    transition: all .3s cubic-bezier(.43,.15,.63,.93);
  }
  ul.social > li > a:hover + .description {
    opacity: .9;
    font-size: 95%;
  }
}
</style>