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
</script>

<template>
  <div>
    <PageHero
      eyebrow="FOR PHOTOGRAPHERS / 摄影师入驻"
      title="你的镜头，值得遇见更多故事。"
      description="把对光影的热爱，带到旅行现场。和旅艺拍一起，记录风景，也记录身在其中的人。"
      image="/images/portrait.webp"
      alt="站在山野中的旅行者与辽阔风景"
    />
    <section class="section container">
      <SectionHeading
        eyebrow="FOCUS ON WHAT YOU LOVE"
        title="专注每次拍摄，也照顾拍摄之后。"
        description="从了解订单，到整理并交付作品，让一次记录有清晰的开始与结束。"
        centered
      />
      <div class="value-grid">
        <article>
          <span class="value-icon" aria-hidden="true">⌖</span>
          <h3>走进真实旅行场景</h3>
          <p>围绕景区与拍摄点位开展服务，捕捉旅行者与目的地之间独特的相遇。</p>
        </article>
        <article>
          <span class="value-icon" aria-hidden="true">▤</span>
          <h3>了解订单与拍摄需求</h3>
          <p>通过摄影师端查看相关订单信息，让拍摄准备与现场沟通更有方向。</p>
        </article>
        <article>
          <span class="value-icon" aria-hidden="true">↗</span>
          <h3>连接拍摄与成片交付</h3>
          <p>整理和上传照片、视频，把现场的创作变成游客可以收藏的作品。</p>
        </article>
      </div>
    </section>
    <section class="section section-soft">
      <div class="container">
        <SectionHeading
          eyebrow="YOUR CREATIVE WORKFLOW"
          title="从快门按下，到记忆送达。"
        /><JourneySteps :steps="steps" />
      </div>
    </section>
    <section class="section container product-intro">
      <div class="photographer-tool">
        <div class="tool-top">
          <img
            src="/brand-icon.png"
            width="44"
            height="44"
            alt=""
            loading="lazy"
          /><span>旅艺拍 · 摄影师端</span>
        </div>
        <h3>让创作与交付，<br />井然有序。</h3>
        <div class="tool-features">
          <span>拍摄订单</span><span>素材上传</span><span>作品交付</span>
        </div>
        <p>摄影师端能力介绍</p>
      </div>
      <div>
        <SectionHeading
          eyebrow="MADE FOR YOUR WORK"
          title="旅行现场的工作伙伴。"
          description="旅艺拍摄影师端面向 Android 设备，为拍摄订单、素材整理与作品交付提供支持。具体功能及设备兼容情况，以实际发布版本为准。"
        />
        <div class="button-row">
          <ElButton
            v-if="site.photographerDownloadUrl"
            tag="a"
            :href="site.photographerDownloadUrl"
            type="primary"
            round
            size="large"
            target="_blank"
            rel="noopener noreferrer"
            >下载 Android 摄影师端 <span aria-hidden="true">↗</span></ElButton
          ><ElButton tag="a" href="/about#contact" round size="large"
            >了解我们与入驻方向 <span aria-hidden="true">↗</span></ElButton
          >
        </div>
        <p class="small-note">
          入驻安排与可服务景区，将根据具体合作情况沟通确认。
        </p>
      </div>
    </section>
    <CooperationBanner />
  </div>
</template>
