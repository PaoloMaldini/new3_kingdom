<script setup lang="ts">
defineProps<{
  status: 'online' | 'offline' | 'loading'
  label: string
}>()
</script>

<template>
  <span class="status-badge" :data-status="status">{{ label }}</span>
</template>
