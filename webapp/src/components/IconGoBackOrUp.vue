<template>
  <span class="action go-back-or-up" @click="goBackOrUp">⇖</span>
</template>

<script>
import goBackOrUp from '@/mixins/go-back-or-up.js'

export default {
  name: "IconGoBackOrUp",
  mixins: [goBackOrUp],
}
</script>

<style lang="less" scoped>
.go-back-or-up {
  color: var(--color_text_action_active);
  font-weight: 700;
}
</style>