<script setup lang="ts">
defineProps<{
  title: string
  accent: string
  summary: string
  tags: string[]
}>()
</script>

<template>
  <article class="faction-card" :style="{ '--accent': accent }">
    <div class="faction-card__header">
      <span class="faction-card__dot"></span>
      <h3>{{ title }}</h3>
    </div>
    <p>{{ summary }}</p>
    <ul class="faction-card__tags">
      <li v-for="tag in tags" :key="tag">{{ tag }}</li>
    </ul>
  </article>
</template>
