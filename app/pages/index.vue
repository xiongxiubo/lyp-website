<script setup lang="ts">
import { ArrowRight, TopRight } from "@element-plus/icons-vue";
usePageMeta(
  "为游客拍出影视级旅游短视频",
  "旅艺拍连接旅行者、摄影师与景区，提供照片旅拍、短视频与 AI 视频服务，让每一段旅行拥有值得收藏的影像。",
);
</script>

<template>
  <div>
    <section class="home-hero">
      <div class="hero-gradient" aria-hidden="true" />
      <div class="hero-shade" />
      <div class="container hero-inner">
        <div class="hero-copy">
          <span class="hero-kicker"><span /> 在风景里，发现自己</span>
          <h1>
            为游客拍出<br /><span class="hero-title-accent">影视级旅游短视频。</span>
          </h1>
          <p>
            风景值得奔赴，你也值得被记录。<br />和旅艺拍一起，把路过的世界，变成属于你的记忆。
          </p>
          <div class="hero-actions">
            <ElButton tag="a" href="#collab-partners" type="primary" size="large"
              >城市代理合作 <ElIcon><TopRight /></ElIcon></ElButton
            ><NuxtLink to="#collab-partners" class="hero-secondary"
              >探索景区合作 <ElIcon><ArrowRight /></ElIcon
            ></NuxtLink>
          </div>
        </div>
        <div class="hero-art" aria-label="旅艺拍洛阳旅游短视频画面拼贴">
          <div class="hero-art-disc" aria-hidden="true" />
          <div class="hero-art-orbit" aria-hidden="true" />
          <span class="hero-art-word" aria-hidden="true">Life, in motion.</span>
          <figure class="hero-art-card hero-art-qr">
            <img
              src="/images/mini-program-qr.jpg"
              width="430"
              height="430"
              alt="旅艺拍微信小程序码"
              fetchpriority="high"
            />
            <figcaption>打开微信 · 扫一扫</figcaption>
          </figure>
          <figure class="hero-art-card hero-art-main">
            <img
              src="/images/hero-luoyi.webp"
              width="900"
              height="1600"
              alt="洛邑古城旅游短视频画面中的汉服游客"
              fetchpriority="high"
            />
            <figcaption><span>01 / 洛邑古城</span><b>说洛阳</b></figcaption>
          </figure>
          <figure class="hero-art-card hero-art-mini">
            <img
              src="/images/hero-yingtian.webp"
              width="900"
              height="1600"
              alt="应天门夜景中的汉服旅游短视频画面"
              fetchpriority="high"
            />
            <figcaption>02 / 应天门 · 玉楼金阙</figcaption>
          </figure>
          <span class="hero-art-sticker"
            >每个游客<br /><strong>都是主角</strong
            ><span aria-hidden="true">↗</span></span
          >
          <span class="hero-art-spark hero-art-spark-one" aria-hidden="true"
            >✳</span
          >
          <span class="hero-art-spark hero-art-spark-two" aria-hidden="true"
            >✦</span
          >
        </div>
        <div class="hero-bottom">
          <span>TRAVEL. CREATE. REMEMBER.</span
          ><span class="hero-bottom-note"
            >向风景出发，带故事回来 <span aria-hidden="true">↓</span></span
          >
        </div>
      </div>
      <span class="image-credit hero-credit">旅艺拍</span>
    </section>

    <HomeCollaborationSections />
    <CooperationBanner />
  </div>
</template>
