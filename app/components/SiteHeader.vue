<script setup lang="ts">
import { Menu, TopRight } from "@element-plus/icons-vue";
import { navigation } from "~/data/site";

const currentRoute = useRoute();
const menuOpen = ref(false);
watch(
  () => currentRoute.fullPath,
  () => {
    menuOpen.value = false;
  },
);
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <NuxtLink class="brand" to="/" aria-label="旅艺拍首页">
        <img
          class="brand-lockup"
          src="/Lvyipai.png"
          width="148"
          height="40"
          alt="旅艺拍"
        />
      </NuxtLink>
      <nav class="desktop-nav" aria-label="主导航">
        <NuxtLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          :class="{ 'is-current': currentRoute.path === item.to }"
          :aria-current="currentRoute.path === item.to ? 'page' : undefined"
          >{{ item.label }}</NuxtLink
        >
      </nav>
      <ElButton
        class="header-contact header-admin-button"
        tag="a"
        href="https://lvyipai.aiyaopai.com/"
        round
        >管理后台 <ElIcon><TopRight /></ElIcon
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
          @click="menuOpen = false"
          >{{ item.label }}<span aria-hidden="true">↗</span></NuxtLink
        >
        <a href="https://lvyipai.aiyaopai.com/">管理后台<span aria-hidden="true">↗</span></a>
      </nav>
    </ElDrawer>
  </header>
</template>
