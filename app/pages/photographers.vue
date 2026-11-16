<script setup lang="ts">
import { site } from "~/data/site";
usePageMeta(
  "摄影师入驻",
  "了解旅艺拍摄影师服务与摄影师端，让摄影师在旅行现场发现故事，连接拍摄订单，完成作品交付。",
);
const steps = [
  {
    title: "了解拍摄任务",
    description: "查看订单与服务信息，明确拍摄场景及游客需求。",
  },
  {
    title: "记录旅行现场",
    description: "与游客沟通拍摄安排，用专业视角完成照片或视频拍摄。",
  },
  {
    title: "整理上传作品",
    description: "通过摄影师端整理拍摄素材，并关联相应拍摄订单。",
  },
  {
    title: "完成成片交付",
    description: "确认交付内容，让游客在小程序查看自己的旅行作品。",
  },
];
const platforms = [
  { name: "Android", label: "安卓", icon: "/photographer-app-icon.png", description: "小米/华为/OPPO/VIVO", action: "点击下载" },
  { name: "HarmonyOS", label: "鸿蒙", icon: "/photographer-app-icon.png", description: "鸿蒙设备支持", action: "点击下载" },
  { name: "iOS", label: "iOS", icon: "/photographer-app-icon.png", description: "iPhone 与 iPad", action: "在Apple Store中下载" },
  { name: "WeChat", label: "小程序", icon: "/lvyipai-app-icon.png", description: "微信服务入口", action: "微信扫一扫" },
];
</script>

<template>
  <div>
    <PageHero
      class="photographer-page-hero"
      eyebrow="FOR PHOTOGRAPHERS / 摄影师入驻"
      title="你的镜头，值得遇见更多故事。"
      description="把对光影的热爱，带到旅行现场。和旅艺拍一起，记录风景，也记录身在其中的人。"
      image="/images/portrait.webp"
      alt="站在山野中的旅行者与辽阔风景"
    >
      <ElButton
        tag="a"
        href="#app-download"
        class="photographer-hero-download"
        size="large"
      >
        下载 App <span aria-hidden="true">↓</span>
      </ElButton>
      <img
        class="photographer-hero-mockup"
        src="/photographer-app-mockup.png"
        width="1438"
        height="1622"
        alt="旅艺拍摄影师端手机样机"
        fetchpriority="high"
      />
    </PageHero>
    <section class="section section-soft">
      <div class="container">
        <SectionHeading
          eyebrow="YOUR CREATIVE WORKFLOW"
          title="从快门按下，到记忆送达。"
        /><JourneySteps :steps="steps" />
      </div>
    </section>
    <section id="app-download" class="section platform-download-section">
      <div class="container">
        <div class="platform-download-heading">
          <div>
            <span class="eyebrow">DOWNLOAD / 下载摄影师端</span>
            <h2>选择你的设备，<br />开始记录旅行现场。</h2>
          </div>
          <p>
            摄影师端将逐步覆盖主流设备与微信服务入口。<br />具体下载方式以实际发布版本为准。
          </p>
        </div>
        <div class="platform-entry-grid" aria-label="应用平台入口">
          <component
            :is="site.photographerDownloadUrl && platform.name !== 'WeChat' ? 'a' : 'article'"
            v-for="platform in platforms"
            :key="platform.name"
            class="platform-entry-card"
            :href="site.photographerDownloadUrl && platform.name !== 'WeChat' ? site.photographerDownloadUrl : undefined"
            :target="site.photographerDownloadUrl && platform.name !== 'WeChat' ? '_blank' : undefined"
            :rel="site.photographerDownloadUrl && platform.name !== 'WeChat' ? 'noopener noreferrer' : undefined"
          >
            <span class="platform-entry-mark">
              <img :src="platform.icon" width="52" height="52" :alt="`${platform.label}图标`" />
            </span>
            <div>
              <small>{{ platform.name }}</small>
              <strong>{{ platform.label }}</strong>
              <p>{{ platform.description }}</p>
            </div>
            <b>
              {{ platform.action }}
              <img
                v-if="platform.name === 'WeChat'"
                class="platform-mini-qr"
                src="/images/mini-program-qr.jpg"
                width="88"
                height="88"
                alt="旅艺拍微信小程序码"
                loading="lazy"
              />
              <span v-else aria-hidden="true">↗</span>
            </b>
          </component>
        </div>
      </div>
    </section>
  </div>
</template>
