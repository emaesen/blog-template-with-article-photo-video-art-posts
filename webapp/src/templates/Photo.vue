<template>
  <div class="main-photo">
    <figure>
      <h1>
        {{ $page.cms.photos[0].title }}
      </h1>
      <g-image
        :alt="$page.cms.photos[0].title"
        :src="imgUrl"
      />
      <caption>{{ $page.cms.photos[0].description }}</caption>

    </figure>
  </div>
</template>

<page-query>
query Photo ($slug: String!) {
  cms {
    photos(where: { slug: $slug }) {
      id
      title
      slug
      description
      categories {
        id
        title
      }
      photo {
        id
        url
      }
      date
      location {
        landmark
        city
        state_province
        country
      }
    }
  }
}
</page-query>

<script>
import Content from '~/components/Content'
import { getCmsMedia } from '~/utils/medias'
import { getMetaTags } from '~/utils/meta-tags'

export default {
  methods: {
    getCmsMedia,
  },
  components: {
    Content,
  },
  metaInfo() {
    return getMetaTags(this.$page.cms.photos[0]) 
  },
  computed: {
    imgUrl() {
      const imgName=this.$page.cms.photos[0].photo.url
      return getCmsMedia(imgName)
    }
  }
}
</script>