<template>
  <div class="main-biography">

    <h1>{{bio.title}}</h1>

    <div
      v-if="bio.introduction"
      class="biography-introduction p-summary intro"
    >
       {{ bio.introduction }}
    </div>

    <div class="biography-timeline timeline">
      <div class="timeline-bar"></div>
      <ul>
        <BiographyItem
          v-for="(bioItem, index) in bioItems"
          :key="bioItem.id"
          :bioItem="bioItem"
          v-animate-on-intersection
          :class="[{'anima__slide-in-from-left': index%2===0, 'anima__slide-in-from-right': index%2!==0}]"
        />
      </ul>

      
    </div>
  </div>
</template>

<script>
import BiographyItem from '~/components/BiographyItem'
import { getMetaTags } from '~/utils/meta-tags'

import animateOnIntersection from '@/mixins/animate-on-intersection.js';

export default {
  name: 'Biography',
  mixins: [animateOnIntersection],
  components: {
    BiographyItem,
  },
  metaInfo() {
    return getMetaTags(this.bio.seo, this.$route) 
  },
  computed: {
    bio() {
      return this.$page.cms.biography || {}
    },
    bioItems() {
      return this.bio.biographyItem
    }
  }
}
</script>

<page-query>
query BiographyPage {
  cms {
    biography {
      title
      introduction
      biographyItem {
        id
        when
        where
        what
        image {
          id
          url
          width
          height
          size
          alternativeText
          formats
        }
      }
      seo {
        title
        description
        shareImage {
          id
          url
          width
          height
          size
          alternativeText
          formats
        }
      }
    }
  }
}
</page-query>

<style lang="less">
.biography-introduction {
  margin-bottom: 3em;
}
.timeline {
  position: relative;
}
.timeline-bar {
  padding: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(20vw - 1px);
  width: 1px;
  background-color: var(--color_border_accent-1);
  opacity: .3;
}
.timeline ul {
  margin: 0;
  margin-block: 0 0;
  padding-inline-start: 0;
}
.timeline li {
	position:relative;
	margin: 1em 0;
	width:75vw;
  list-style-type:none;
  padding: .5em 1em;
  &:before, &:after {
    position: absolute;
    display: inline-block;
    top: .9em;
    content: '';
    border-radius: .5em;
    width: .5em;
    height: .5em;
    opacity: .6;
  }
}
.timeline li {
  left:20vw;
  &:before {
    border: 1px solid var(--color_border_accent-1);
    background-color: var(--color_bg);
    left: -.25em;
  }
  .biography-when {
    right: calc(75vw + 1em);
    text-align: right;
  }
}

.biography-when {
  position: absolute;
  top: .7em;
}

@media all and (min-width: 700px) {
  .timeline-bar {
    left: 50%;
  }
  .timeline li {
    left:50%;
    width:45%;
    .biography-when {
      right: calc(45vw + .1em);
      text-align: right;
    }
  }
  .timeline li:nth-child(odd) {
    left: 5%;
    text-align: right;
    &:before {
      display: none;
    }
    &:after {
      border: 1px solid var(--color_border_accent-1);
      background-color: var(--color_bg);
      right: -.25em;
    }
    .biography-when {
      left: calc(45vw + .1em);
      text-align: left;
    }
  }
}


@media all and (min-width: 1140px) {
  .timeline li {
    .biography-when {
          right: calc((1100px * .45) + 2 * var(--layout-padding) + .1em);
    }
  }
  .timeline li:nth-child(odd) {
    .biography-when {
          left: calc((1100px * .45) + 2 * var(--layout-padding) + .1em);
    }
  }
}
</style>