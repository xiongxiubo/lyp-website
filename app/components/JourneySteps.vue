<script setup lang="ts">
import { journey } from "~/data/site";
defineProps<{ steps?: { title: string; description: string }[] }>();
</script>

<template>
  <ol class="journey-steps">
    <li v-for="(step, index) in steps || journey" :key="step.title">
      <span class="step-number">{{ String(index + 1).padStart(2, "0") }}</span>
      <h3>{{ step.title }}</h3>
      <p>{{ step.description }}</p>
    </li>
  </ol>
</template>
