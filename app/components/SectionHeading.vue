<script setup lang="ts">
defineProps<{
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}>();
</script>

<template>
  <div class="section-heading" :class="{ 'is-centered': centered }">
    <span class="eyebrow">{{ eyebrow }}</span>
    <h2>{{ title }}</h2>
    <p v-if="description">{{ description }}</p>
  </div>
</template>
