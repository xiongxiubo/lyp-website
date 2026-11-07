<script setup lang="ts">
import { navigation, site } from "~/data/site";

const icpUrl = computed(
  () =>
    `https://beian.mps.gov.cn/#/query/webSearch?code=${encodeURIComponent(site.icpNumber)}`,
);
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-main">
      <div class="footer-brand">
        <NuxtLink to="/" aria-label="旅艺拍首页"
          ><img
            src="/Lvyipai_dark.png"
            width="160"
            height="43"
            alt="旅艺拍"
            loading="lazy"
        /></NuxtLink>
        <p>为游客拍出影视级旅游短视频</p>
      </div>
      <div>
        <h2>探索旅艺拍</h2>
        <nav aria-label="页脚导航">
          <NuxtLink
            v-for="item in navigation.slice(1)"
            :key="item.to"
            :to="item.to"
            >{{ item.label }}</NuxtLink
          >
        </nav>
      </div>
      <div>
        <h2>一起创造旅行记忆</h2>
        <p>连接旅行者、摄影师与目的地，<br />让好的风景，也有好的故事。</p>
        <NuxtLink class="footer-contact" to="/about#contact"
          >了解我们与合作方向 <span aria-hidden="true">↗</span></NuxtLink
        >
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© {{ new Date().getFullYear() }} {{ site.company }}</span
      ><a
        v-if="site.icpNumber"
        class="footer-icp-link"
        :href="icpUrl"
        target="_blank"
        rel="noopener noreferrer"
        ><img
          class="footer-icp-badge"
          src="/icp-badge.png"
          width="18"
          height="18"
          alt="备案图标"
          loading="lazy"
        />{{ site.icpNumber }}</a
      ><span>为游客拍出影视级旅游短视频</span>
    </div>
  </footer>
</template>
