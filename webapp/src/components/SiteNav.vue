<template>
    <nav :class="['nowrap', 'expand', {'bar-open':isBarMenuOpen, 'bar-closed':!isBarMenuOpen}]">

    <span @click="toggleMenu" class="menu-icon">
      <IconMenu/>
    </span>

    <ul :class="['nav menu', {'bar-open':isBarMenuOpen, 'bar-closed':!isBarMenuOpen}]" role="menu"
      @click="onNavClick('menu', $event)">
      <li class="nav item" role="menuitem">
        <g-link to="/" exact>Home</g-link>
      </li>
      <li
        @mouseover.passive="onNavMouseOver('posts', $event)"
        @mouseleave.passive="onNavMouseLeave('posts', $event)"
        class="nav item"
        role="menuitem"
      >
        <g-link to="/posts">
          <span @click.stop.prevent="onNavClick('posts', $event)" class="actionicon">
            <IconArrowUpDown/>
          </span>
          Posts
        </g-link>
        <ul :class="['nav submenu', {collapsed:!isNavpostsExpanded}]" role="menu">
          <li class="nav item post-sub" role="menuitem">
            <g-link to="/posts/articles">
              Articles
            </g-link>
          </li>
          <li class="nav item post-sub" role="menuitem">
            <g-link to="/posts/photos">
              Photos
            </g-link>
          </li>
          <li class="nav item post-sub" role="menuitem">
            <g-link to="/posts/videos">
              Videos
            </g-link>
          </li>
          <li class="nav item post-sub" role="menuitem">
            <g-link to="/posts/notes">
              Notes
            </g-link>
          </li>
        </ul>
      </li>
      <li class="nav item" role="menuitem">
        <g-link to="/about/">About</g-link>
      </li>
    </ul>
  </nav>

</template>

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
      isMouseOverNavposts: false,
      showBarMenu: true,
      isBarMenuOpen: false,
      windowBreakPoint: 650,
      isTouch: false,
      ua: ""
    }
  },
  mounted() {
    this.setUA();
    this.setTouchProp();
  },
  methods: {
    onNavMouseOver(target) {
      if (target==="posts" && !this.showBarMenu && !this.isTouch) {
        this.isNavpostsExpanded = true;
        this.isMouseOverNavposts = true;
      }
    },
    onNavMouseLeave(target) {
      if (target==="posts" && !this.showBarMenu && !this.isTouch) {
        this.isNavpostsExpanded = false;
        this.isMouseOverNavposts = false;
      }
    },
    onNavClick(target, evt) {
      if (target==="postsMenuToggle") {
        this.isNavpostsExpanded = !this.isNavpostsExpanded;
      }
      if (target==="posts" && !this.isMouseOverNavposts) {
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
        this.isBarMenuOpen = false;
      }
    },
    toggleMenu() {
      this.isBarMenuOpen = !this.isBarMenuOpen;
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
      console.log({windowWidth:newWidth})
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
  line-height: 120%;
  top: 0;
  width: 100%;
  z-index: 3;
  padding: 3px;
  border-bottom: 1px solid var(--color_border_accent-1);
  opacity: 0.9;
  background-color: var(--color_bg);
  display: grid;
  justify-content: flex-end;
}
.menu {
  a {
    opacity: 1;
    padding: 5px 10px;
    display: inline-block;
    border: 2px solid #293849;
    border: 2px solid #80afe430;
    background-color: var(--color_bg);
    font-family: var(--font_family_header);
    font-weight: 700;
    &.active {
      color: var(--color_text_action_selected);
      box-shadow: 0 0 30px #a7dcff;
    }
  }
  a + a {
    margin-left:0;
    border-left: none;
  }
}
.submenu {
  border-left: 2px solid #80afe430;
  border-right: 2px solid #80afe430;
  a {
    border: none;
  }
}
a.active--exact {
  cursor: default;
  color: var(--color_text_action_selected);
  text-decoration: none;
}
a:not(.active--exact):hover {
  text-decoration: underline;
}
a.active {
  border-top: 2px solid #80afe4;
  border-bottom: 2px solid #80afe4;
}

.actionicon {
  float: right;
  height: 1em;
  width: 2em;
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
  padding: 0;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
.nav.item {
  float: left;
  position: relative;
  a {
    padding: 5px 10px;
  }
}
.nav.submenu {
  background-color: var(--color_bg);
  position: absolute;
  height: auto;
  left: 0;
 .nav.item {
    display: grid;
    float: none;
 }
}
.nav.submenu.collapsed {
  height: 0;
  visibility: hidden;
  top:-200px;
}
.nav.submenu.collapsed a {
  display: none;
}
.divider {
  border-top: 1px solid var(--color_border_accent-2);
  margin: 10px 0;
}
.menu-icon {
  position: fixed;
  top: 0;
  right: 0;
  padding: 10px;
  visibility: hidden;
  z-index: 10;
  cursor: pointer;
}
ul {
  transition: transform .3s cubic-bezier(0.23, 0.03, 0.82, 1.8), 
              opacity .3s linear;
  transform: translateY(0);
  opacity: 1;
}
ul.collapsed {
  transform: translateY(-20px);
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
    &.bar-open {
      z-index: 999999;
      padding-top: 10px;
    }
    .nav.menu {
      transition: all 1s ease-in-out;
    }
    .nav.menu.bar-closed {
      visibility: hidden;
      transform: translateY(-100px);
      opacity: 0;
      height: 35px;
    }
    .nav.menu.bar-open {
      height: 1000px;
      transform: translateY(0);
      opacity: 1;
    }
    .nav.menu {
      width: 80%;
    }
    .nav.item {
      float: none;
      display: grid;
      a {
        padding: 10px;
      }
    }
    .nav.submenu:not(.collapsed) {
      position: relative;
      margin-left: 1em;
    }
    .menu-icon {
      visibility: visible;
    }
  }
};
</style>