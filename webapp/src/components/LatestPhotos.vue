<template>
  <section v-if="hasPhotos" class="h-feed">

    <div class="cards-header-container">

      <div>
        <div
          @click="cycleSelectionType"
          class="selection-type-toggle"
          title="toggle latest or featured"
        >
          <IconSwitchLF
            :selected="selectedType"
          />
        </div>

        <h2 class="cards-header p-name">
          {{ headerText }}
        </h2>
      </div>

      <a 
        v-if="showViewAllLink"
        class="cards-action nodeco" href="/p/photos/"
      >
        view all {{ totalNrOfPhotos }} photos
      </a>

    </div>

    <transition-group name="flexlist" tag="div" class="cards-container flexlist-container">
      <PostCard
        v-for="photo in selectedPhotos"
        :key="photo.id"
        :post="photo"
        postType="photo"
        class="flexlist-item"
      />
    </transition-group>

  </section>
</template>

<static-query>
query LatestPhotos($limit: Int = 4) {
  cms {
    # List photos
    latestPhotos: photos(sort: "createdAt:desc" limit:$limit) {
      id
      title
      slug
      categories {
        id
        title
      }
      series {
        id
        title
      }
      photo {
        id
        url
      }
      createdAt
    }
    photosCount
    featuredPost {
      photos(sort: "createdAt:desc") {
        id
        title
        slug
        categories {
          id
          title
        }
        series {
          id
          title
        }
        photo {
          id
          url
        }
        createdAt
      }
    }
  }
}
</static-query>

<script>
import PostCard from '~/components/PostCard'
import RichText from '~/components/RichText'
import IconSwitchLF from '~/components/IconSwitchLF'
import { getSeoMetaTags } from '~/utils/seo'

export default {
  components: {
    PostCard,
    RichText,
    IconSwitchLF,
  },
  data() {
    return {
      selectionTypes: ["featured", "latest"],
      selectionIndex: 1
    }
  },
  computed: {
    latestPhotos() {
      // the maximum nr of photos to show is defined by `limit` in the 
      // graphql query
      return this.$static.cms.latestPhotos
    },
    featuredPhotos() {
      return this.$static.cms.featuredPost.photos
    },
    selectedType() {
      return this.selectionTypes[this.selectionIndex]
    },
    selectedPhotos() {
      return this[this.selectedType+"Photos"]
    },
    headerText() {
      return this.selectedType + " photos"
    },
    cycleText() {
      let si = this.selectionIndex + 1
      if (si >= this.selectionTypes.length) si = 0
      const nextInCycle = this.selectionTypes[si]
      return "view " + nextInCycle
    },
    nrOfDisplayedPhotos() {
      return this.latestPhotos.length
    },
    hasPhotos() {
      return this.nrOfDisplayedPhotos > 0
    },
    totalNrOfPhotos() {
      return this.$static.cms.photosCount
    },
    showViewAllLink() {
      return this.totalNrOfPhotos > this.nrOfDisplayedPhotos
    }
  },
  methods: {
    cycleSelectionType() {
      let si = this.selectionIndex + 1
      if (si >= this.selectionTypes.length) si = 0
      this.selectionIndex = si
    }
  },
}
</script>

<style lang="less" scoped>
@import "~/assets/styles/transi.less";

</style>
