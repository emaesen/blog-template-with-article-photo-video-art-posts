<template>
  <footer>
    <!-- Other website links -->
    <div
      v-if="websiteLists"
      class="anima__reveal-through-flip__container"
    >
      <div
        class="footer-lists other-sites anima__reveal-through-flip-up"
        v-animate-on-intersection
      >
        <div
          v-for="list in websiteLists"
          :key="list.title"
          class="other-sites-group"
        >
          <h2 class="mini">{{ list.title }}</h2>
          <ul class="other-sites">
            <li
              v-for="website in list.website" 
              :key="website.title"
            >
              <a
                :href="website.url"
                target="_blank"
                :rel="(website.isMyProfileOrPersonalSite?'me ':'') + 'noopener noreferrer nofollow'"
                class="nowrap u-url"
              >{{ website.title }}</a>
              <span class="description">
                {{ website.description }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="legal expand bgcolor-opaque">
      <span class="copyright">
        © {{ copyrightYear }} {{ global.copyrightOwner }}. {{ global.rightsText }}
      </span>
      <span
        class="version"
        @click="revealMadeBy"
      >{{ version }}</span>
    </div>

    <div class="madeby-container expand noprint">
      <div
        ref="madeby"
        class="madeby"
      >
        <div>
          <a
            href="https://github.com/emaesen/blog-template-with-article-photo-video-art-posts"
            target="_blank"
            rel="noopener noreferrer nofollow"
            class="nodeco"
          >Website template</a><br>by <a
            href="https://epvm.name"
            target="_blank"
            rel="noopener noreferrer nofollow"
            class="nodeco"
          >Edward Maesen</a>
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
      copyrightOwner
      rightsText
      siteName
      otherWebsites {
        title
        website {
          title
          url
          description
          isMyProfileOrPersonalSite
        }
      }
    }
  }
}
</static-query>

<script>
import animateOnIntersection from '~/mixins/animate-on-intersection.js'

export default {
  name: "Footer",
  mixins: [animateOnIntersection],
  data() {
    return {
      version: "",
    }
  },
  beforeMount() {
    const version = this.metaData.version;
    if (this.isInStandaloneMode()) {
      // Site is running stand-alone as installed web App
      this.version = version + "-A";
    } else {
      // Site is running in web Browser
      this.version = version + "-B";
    }
  },
  computed: {
    metaData() {
      return this.$static.metadata
    },
    global() {
      return this.$static.cms.global || {}
    },
    websiteLists() {
      return this.global.otherWebsites
    },
    copyrightYear() {
      const currentYear = new Date().getFullYear();
      const startYear = this.global.createdAt && this.global.createdAt.substring(0,4) || currentYear
      return startYear < currentYear ? startYear + " - " + currentYear : currentYear
    },
    madeby() {
      return this.$refs.madeby
    },
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
  margin-top: 9em;
  overflow: hidden;
  font-size: .95em;
}
.footer-lists {
  border-radius: 15px;
  background-color: rgba(var(--base-color_bg_accent-1),.2);
  box-shadow: 0 -2px 7px -3px var(--color_border_accent-2);
  margin: 7px 4px;
  padding: .2em 0 2em;
}
.footer-lists h2 {
  margin: .9em 0 -.2em;
}
.other-sites-group {
  padding: 0 1em;
}
ul.other-sites {
  margin-bottom: 0;
  list-style-type: none;
  margin-block-start:0;
  margin-block-end:0;
  margin-inline-start:0;
  margin-inline-end:0;
  padding-inline-start: 0;
}
ul.other-sites > li {
  display: flex;
  align-items: baseline;
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
  padding-top: 9px;
  box-shadow: 0 3px 27px -9px var(--color_border_accent-1);
  z-index: 999;
  opacity: 1;
  background-color: var(--color_bg_accent-1);
}

.version {
  position: absolute;
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
   padding: 0 .5em .3em 0;
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

@media screen and (min-width:1100px) {
  .madeby {
    transform: rotate(180deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  /* fancy description */
  .description {
    transition: all .3s cubic-bezier(.43,.15,.63,.93);
  }
  ul.other-sites > li > a:hover + .description {
    opacity: 1;
    color: var(--color_text_action_hover);
  }
}
</style>