<template>
  <ElConfigProvider :locale="zhCn">
    <NuxtRouteAnnouncer />
    <NuxtLayout><NuxtPage /></NuxtLayout>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import zhCn from "element-plus/es/locale/lang/zh-cn";
</script>
