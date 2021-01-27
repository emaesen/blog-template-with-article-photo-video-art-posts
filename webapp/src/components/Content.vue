<template>
  <div>
    <div
      v-for="cs in content"
      :key="cs.__typename + cs.id"
    >
      <!-- Display the right component based on type name -->
      <div
        v-if="cs.__typename === 'cmsTypes_ComponentSectionsRichText'"
        class="para spacious"
      >
        <RichText :data="cs" />
      </div>
      <div
        v-if="cs.__typename === 'cmsTypes_ComponentSectionsLargeMedia'"
        class="para spacious"
      >
        <LargeMedia :data="cs" />
      </div>
      <div
        v-if="cs.__typename === 'cmsTypes_ComponentSectionsImagesSlider'"
        class="para spacious"
      >
        <ImagesSlider :data="cs" />
      </div>
    </div>
  </div>
</template>

<script>
import RichText from '~/components/RichText'
import LargeMedia from '~/components/LargeMedia'
import ImagesSlider from '~/components/ImagesSlider'

export default {
  name: 'Content',
  props: ["content"],
  components: {
    RichText,
    LargeMedia,
    ImagesSlider,
  }
}
</script>