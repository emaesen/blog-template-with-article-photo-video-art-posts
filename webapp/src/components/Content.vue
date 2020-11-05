<template>
  <div>
    <div
      v-for="contentSection in content"
      :key="contentSection.__typename + contentSection.id"
    >
      <!-- Display the right component based on type name -->
      <div v-if="contentSection.__typename === 'cmsTypes_ComponentSectionsRichText'">
        <RichText :data="contentSection" class="" />
      </div>
      <div v-if="contentSection.__typename === 'cmsTypes_ComponentSectionsLargeMedia'">
        <LargeMedia :data="contentSection" />
      </div>
      <div v-if="contentSection.__typename === 'cmsTypes_ComponentSectionsImagesSlider'">
        <ImagesSlider :data="contentSection" />
      </div>
    </div>
  </div>
</template>

<script>
import RichText from '~/components/RichText'
import LargeMedia from '~/components/LargeMedia'
import ImagesSlider from '~/components/ImagesSlider'

export default {
  props: ["content"],
  components: {
    RichText,
    LargeMedia,
    ImagesSlider,
  }
}
</script>