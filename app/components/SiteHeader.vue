<script setup lang="ts">
import { Menu, TopRight } from "@element-plus/icons-vue";
import { navigation } from "~/data/site";

const route = useRoute();
const menuOpen = ref(false);
watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false;
  },
);
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <NuxtLink class="brand" to="/" aria-label="旅艺拍首页">
        <img src="/brand-icon.png" width="42" height="42" alt="" />
        <span>旅艺拍<small>旅行中的艺术</small></span>
      </NuxtLink>
      <nav class="desktop-nav" aria-label="主导航">
        <NuxtLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          :class="{ 'is-current': route.path === item.to }"
          :aria-current="route.path === item.to ? 'page' : undefined"
          >{{ item.label }}</NuxtLink
        >
      </nav>
      <ElButton
        class="header-contact"
        tag="a"
        href="/about#contact"
        type="primary"
        round
        >与我们同行 <ElIcon><TopRight /></ElIcon
      ></ElButton>
      <ElButton
        class="mobile-menu-button"
        text
        aria-label="打开导航菜单"
        :aria-expanded="menuOpen"
        @click="menuOpen = true"
        ><ElIcon :size="25"><Menu /></ElIcon
      ></ElButton>
    </div>
    <ElDrawer
      v-model="menuOpen"
      title="探索旅艺拍"
      size="min(86vw, 360px)"
      class="mobile-navigation"
    >
      <nav aria-label="移动端导航">
        <NuxtLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          :aria-current="route.path === item.to ? 'page' : undefined"
          @click="menuOpen = false"
          >{{ item.label }}<span aria-hidden="true">↗</span></NuxtLink
        >
        <NuxtLink to="/about#contact" @click="menuOpen = false"
          >与我们同行<span aria-hidden="true">↗</span></NuxtLink
        >
      </nav>
    </ElDrawer>
  </header>
</template>
