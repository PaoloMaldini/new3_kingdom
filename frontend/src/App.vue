<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { RouterView } from 'vue-router'

import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const documentTitle = computed(() => appStore.title)

watchEffect(() => {
  document.title = documentTitle.value
})
</script>

<template>
  <RouterView />
</template>
