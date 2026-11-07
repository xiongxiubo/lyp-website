<script setup lang="ts">
defineProps<{
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}>();
</script>

<template>
  <section class="page-hero">
    <img
      class="page-hero-image"
      :src="image"
      :alt="alt"
      width="1800"
      height="1100"
      fetchpriority="high"
    />
    <div class="container page-hero-content">
      <span class="eyebrow">{{ eyebrow }}</span>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <slot />
    </div>
    <span class="image-credit">旅艺拍</span>
  </section>
</template>
