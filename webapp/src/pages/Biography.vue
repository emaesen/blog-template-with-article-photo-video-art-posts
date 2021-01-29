<template>
  <div class="main-biography">

    <h1>{{bio.title}}</h1>

    <div
      v-if="bio.introduction"
      class="biography-introduction p-summary"
    >
       {{ bio.introduction }}
    </div>

    <div class="biography-timeline timeline">
      <div class="timeline-bar"></div>
      <ul>
        <BiographyItem
          v-for="bioItem in bioItems"
          :key="bioItem.id"
          :bioItem="bioItem"
        />
      </ul>

      
    </div>
  </div>
</template>

<script>
import BiographyItem from '~/components/BiographyItem'
import { getMetaTags } from '~/utils/meta-tags'


export default {
  name: 'Biography',
  components: {
    BiographyItem,
  },
  metaInfo() {
    return getMetaTags(this.bio.seo, this.$route) 
  },
  computed: {
    bio() {
      return this.$page.cms.biography
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
        }
      }
      seo {
        title
        description
        shareImage {
          id
          url
        }
      }
    }
  }
}
</page-query>

<style lang="less">
.timeline {
  position: relative;
}
.timeline-bar {
  padding: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50vw;
  width: 1px;
  background-color: var(--color_border_accent-1);
}
.timeline ul {
  margin: 0;
  margin-block: 0 0;
  padding-inline-start: 0;
}
.timeline li {
	position:relative;
	margin: 1em 0;
	width:45vw;
  list-style-type:none;
  padding: .5em;
  &:before, &:after {
    position: absolute;
    display: inline-block;
    top: .9em;
    content: '';
    border-radius: .5em;
    width: .5em;
    height: .5em;
  }
}
.timeline li:nth-child(odd) {
  left: 5vw;
  text-align: right;
  &:after {
    border: 1px solid var(--color_border_accent-1);
    background-color: var(--color_bg);
    right: -.25em;
  }
  .biography-when {
    left: 47vw;
    text-align: left;
  }
}
.timeline li:nth-child(even) {
  left:50vw;
  &:before {
    border: 1px solid var(--color_border_accent-1);
    background-color: var(--color_bg);
    left: -.25em;
  }
  .biography-when {
    right: 47vw;
    text-align: right;
  }
}

.biography-when {
  position: absolute;
  top: .7em;
}
</style>