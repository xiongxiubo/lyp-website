<script setup lang="ts">
import { site } from "~/data/site";
const open = ref(false);
</script>

<template>
  <template v-if="site.miniProgramQrCode">
    <ElButton type="primary" size="large" round @click="open = true"
      >扫码体验小程序 <span aria-hidden="true">↗</span></ElButton
    >
    <ElDialog
      v-model="open"
      title="微信扫码，开启旅拍体验"
      width="min(420px, 92vw)"
      align-center
      ><div class="qr-content">
        <img
          :src="site.miniProgramQrCode"
          width="240"
          height="240"
          alt="旅艺拍微信小程序二维码"
        />
        <p>使用微信扫一扫，发现旅拍服务。</p>
      </div></ElDialog
    >
  </template>
</template>
