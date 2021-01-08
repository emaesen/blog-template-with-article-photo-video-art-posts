<template>
    <nav :class="['nowrap', 'expand', {'bar-open':isBarMenuOpen, 'bar-closed':!isBarMenuOpen}]">

    <span @click="toggleMenu" class="menu-icon">
      <IconMenu :isBarMenuOpen="isBarMenuOpen"/>
    </span>

    <ul :class="['nav menu', {'bar-open':isBarMenuOpen, 'bar-closed':!isBarMenuOpen}]" role="menu"
      @click="onNavClick('menu', $event)">

      <li class="nav item" role="menuitem">
        <g-link to="/" exact>Home</g-link>
      </li>

      <li
        v-for="post in activePostsUngrouped"
        :key="post.name"
        class="nav item"
        role="menuitem"
      >
        <g-link :to="post.url">{{post.name}}</g-link>
      </li>

      <li
        v-if="groupPostTypes"
        @mouseenter.passive="onNavMouseEnter('posts', $event)"
        @mouseleave.passive="onNavMouseLeave('posts', $event)"
        :class="['nav item hassubmenu', {flip:isNavpostsExpanded}]"
        role="menuitem"
      >
        <span
          @click.stop.prevent="onNavClick('posts', $event)"
          class="actionicon"
        >
          <IconArrowUpDown :isArrowUp="isNavpostsExpanded"/>
        </span>
        <g-link to="/posts/" :class="{active:isPostSubPageActive}">
          Posts
        </g-link>
        <ul :class="['nav submenu', {expanded:isNavpostsExpanded,collapsed:!isNavpostsExpanded}]" role="menu">

          <li
            v-for="post in activePosts"
            :key="post.name"
            class="nav item post-sub"
            role="menuitem"
          >
            <g-link :to="post.url">{{post.name}}</g-link>
          </li>

        </ul>
      </li>

      <li class="nav item" role="menuitem">
        <g-link to="/about/">About</g-link>
      </li>

    </ul>
  </nav>

</template>

<static-query>
query SiteNav {
  cms {
    articlesCount
    notesCount
    photosCount
    videosCount
  }
}
</static-query>



<script>
import IconMenu from '~/components/IconMenu'
import IconArrowUpDown from '~/components/IconArrowUpDown'

import windowSize from '@/mixins/window_size.js'

export default {
  name: 'SiteNav',
  mixins: [windowSize],
  components: {
    IconMenu,
    IconArrowUpDown,
  },
  data() {
    return {
      isNavpostsExpanded: false,
      isMouseEnterNavposts: false,
      showBarMenu: true,
      isBarMenuOpen: false,
      windowBreakPoint: 650,
      isTouch: false,
      ua: "",
      groupedPostsThreshold: 2,
    }
  },
  mounted() {
    this.setUA()
    this.setTouchProp()
  },
  computed: {
    basePath() {
      return this.$route.path.replace(/\/\d+.*/,"/")
    },
    cms() {
      return this.$static.cms
    },
    nrOfArticles() {
      return this.cms.articlesCount
    },
    nrOfNotes() {
      return this.cms.notesCount
    },
    nrOfPhotos() {
      return this.cms.photosCount
    },
    nrOfVideos() {
      return this.cms.videosCount
    },
    nrActivePostsTypes() {
      return Math.sign(this.nrOfArticles) + Math.sign(this.nrOfNotes) + Math.sign(this.nrOfPhotos) + Math.sign(this.nrOfVideos)
    },
    activePosts () {
      let posts = []
      if (this.nrOfArticles) 
        posts.push({name:"Articles",url:"/p/articles/"})
      if (this.nrOfPhotos) 
        posts.push({name:"Photos",url:"/p/photos/"})
      if (this.nrOfVideos) 
        posts.push({name:"Videos",url:"/p/videos/"})
      if (this.nrOfNotes) 
        posts.push({name:"Notes",url:"/p/notes/"})
      return posts
    },
    groupPostTypes() {
      // decide whether to groups post types under one "Posts" header
      return this.nrActivePostsTypes && this.nrActivePostsTypes > this.groupedPostsThreshold
    },
    activePostsUngrouped() {
      return !this.groupPostTypes && this.activePosts
    },
  },
  methods: {
    onNavMouseEnter(target) {
      if (target==="posts" && !this.showBarMenu && !this.isTouch) {
        this.isNavpostsExpanded = true;
        this.isMouseEnterNavposts = true;
      }
    },
    onNavMouseLeave(target) {
      if (target==="posts" && !this.showBarMenu && !this.isTouch) {
        this.isNavpostsExpanded = false;
        this.isMouseEnterNavposts = false;
      }
    },
    onNavClick(target, evt) {
      if (target==="postsMenuToggle") {
        this.isNavpostsExpanded = !this.isNavpostsExpanded;
      }
      if (target==="posts" && !this.isMouseEnterNavposts) {
        this.isNavpostsExpanded = !this.isNavpostsExpanded;
      }
      if (target==="menu" && this.isNavpostsExpanded) {
        let ispostSub = 
          evt.target.offsetParent 
          && evt.target.offsetParent.className.indexOf('post-sub') !== -1;
        if(!this.showBarMenu || !ispostSub) {
          this.isNavpostsExpanded = false;
        }
      }
      if (target==="menu" && this.showBarMenu) {
        this.isBarMenuOpen = false
        this.isNavpostsExpanded = false
      }
    },
    isPostSubPageActive() {
      return this.basePath.match(/^\/p\/.+/i)
    },
    toggleMenu() {
      this.isBarMenuOpen = !this.isBarMenuOpen;
      // close posts subnav when menu is closed
      if (!this.isBarMenuOpen) {
        this.isNavpostsExpanded = false
      }
      // open posts subnav when menu is opened and a posts subpage is currently active
      if (this.isBarMenuOpen && this.isPostSubPageActive) {
        this.isNavpostsExpanded = true
      }
    },
    setTouchProp() {
      this.isTouch = (window.DocumentTouch && document instanceof DocumentTouch) || 'ontouchstart' in window;
    },
    setUA() {
      this.ua = navigator.userAgent;
    },
    checkDeviceSwitch() {
      const ua = navigator.userAgent;
      if (this.ua !== "" && ua !== this.ua && process && process.env && process.env.NODE_ENV==="development") {
        location.reload(false)
      }
      this.setUA();
    }
  },
  watch: {
    windowWidth(newWidth) {
      // windowWidth is set/updated by the windowSize mixin on window resize
      this.showBarMenu = newWidth < this.windowBreakPoint;
      // for dev case, check if (virtual) device was switched
      this.checkDeviceSwitch();
    },
    showBarMenu(newVal) {
      if (newVal === false) {
        this.isNavpostsExpanded = false;
      }
    }
  }
  
}
</script>

<style lang="less" scoped>
nav {
  position: fixed;
  z-index: 1;
  line-height: 120%;
  top: 0;
  width: 100%;
  opacity: 0.9;
  display: flex;
  justify-content: flex-end;
  align-content: stretch;
  align-items: stretch;
}
.menu {
    border-bottom-left-radius: 15px;
    box-shadow: -2px 2px 7px -3px var(--color_border_accent-1);
    background-color: var(--color_bg);
    > li {
      border-radius: 15px;
    }
  a {
    opacity: 1;
    display: inline-block;
    background-color: var(--color_bg);
    font-family: var(--font_family_emph);
  }
  a + a {
    border-left: none;
  }
}
.submenu {
  border: 1px solid #ccccccaa;
  border-top: none;
  a {
    border: none;
  }
}

.actionicon {
  float: right;
  height: 1em;
  width: 1.5em;
  text-align: right;
  cursor: pointer;
}
.actionicon .icon-arrows {
  height: 1em;
  width: 1em;
}

ul.nav {
  list-style-type: none;
  margin: 0;
  padding: 0 10px;
}
li.nav {
  line-height: unset;
  margin: unset;
}
.nav.item {
  float: left;
  position: relative;
  padding: .6em .9em;
}
.nav.submenu {
  background-color: var(--color_bg);
  position: absolute;
  left: 0;
  padding-top: .6em;
 .nav.item {
    float: none;
    padding-left: 0;
 }
}
.divider {
  border-top: 1px solid var(--color_border_accent-2);
  margin: 10px 0;
}
.menu-icon {
  position: fixed;
  top: 0;
  right: 0;
  padding: 5px 10px;
  visibility: hidden;
  z-index: 10;
  cursor: pointer;
}
ul {
  transition: transform .6s cubic-bezier(0.23, 0.03, 0.82, 1.2), 
              opacity .3s linear;
  transform: translateY(0);
  opacity: 1;
}
ul.expanded {
  z-index:-1;
}
ul.collapsed {
  transform: translateY(-200px);
  opacity: 0;
  z-index:-1;
}
li {
  background-color: var(--color_bg);
}
li li {
  z-index: -1;
}

@media all and (max-width: 650px) {
  nav {
    left: 0;
    width: 100%;
    padding-left: 10px;
    margin-left: 0;
    border-radius: 0;
    opacity: 0.9;
    display: block;
    box-shadow: 0 2px 7px -3px var(--color_border_accent-1);

    background-color: var(--color_bg);

    &.bar-open {
      z-index: 8;
      opacity: 0.96;
    }
    .nav.menu {
      transition: all 1s ease-in-out;
      padding: 0;
      padding-top: 50px;
      display: flex;
      flex-direction: column;
      box-shadow: none;
    }
    .nav.menu.bar-closed {
      transform: translateY(-100px);
      opacity: 0;
      height: 35px;
    }
    .nav.menu.bar-open {
      height: 1000px;
      transform: translateY(20px);
      opacity: 1;
    }
    .nav.menu {
      width: 80%;
      border: none;
    }
    ul {
      transform: translate(0,0);
    }
    ul.expanded {
      z-index:0;
    }
    ul.collapsed {
      transform: translate(-50px,-30px);
      z-index:0;
    }

    .nav.item {
      float: none;
      margin-bottom: 5px;
      box-shadow: 0 1px 2px 0 var(--color_border_accent-2);
      border-radius: 0;
      a {
        margin: 0;
        padding: 10px;
        font-size: 110%;
      }
    }
    .nav.item.hassubmenu {
      max-height: 5em;
      min-height: 3em;
      transition: max-height 0.3s linear, min-height 0.9s linear;
    }
    .nav.item.hassubmenu.flip {
      min-height: 15em;
      max-height: 25em;
    }
    .nav.submenu {
      border: none;
      .nav.item {
        box-shadow: 0 1px 3px 0 var(--color_border_accent-2);
      }
    }
    .nav.submenu {
      position: relative;
      margin-left: 1em;
    }
    .menu-icon {
      visibility: visible;
    }
    .nav a::after {
      background-color: initial !important;
    }
    .nav a:hover, .nav a:hover * {
      background-color: initial !important;
    }

  }
};
</style>