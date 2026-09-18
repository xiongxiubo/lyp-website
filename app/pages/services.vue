<script setup lang="ts">
import { services } from "~/data/site";
usePageMeta(
  "产品与服务",
  "了解旅艺拍照片旅拍、短视频旅拍与 AI 视频服务，发现拍摄场景，在小程序中选择服务并收藏旅行成片。",
);
</script>

<template>
  <div>
    <PageHero
      eyebrow="OUR SERVICES / 产品与服务"
      title="你的旅行，自有表达。"
      description="让照片定格心动，让视频延续故事，让创意为记忆带来新的可能。"
      image="/images/coast.webp"
      alt="海面上轻轻起伏的波浪"
    />
    <nav class="service-tabs" aria-label="服务分类">
      <div class="container">
        <a
          v-for="service in services"
          :key="service.id"
          :href="`#${service.id}`"
          >{{ service.label }}<span aria-hidden="true">↓</span></a
        >
      </div>
    </nav>
    <section
      v-for="(service, index) in services"
      :id="service.id"
      :key="service.id"
      class="section service-detail"
      :class="{ 'section-soft': index === 1 }"
    >
      <div
        class="container split-layout"
        :class="{ 'is-reversed': index === 1 }"
      >
        <figure class="editorial-image">
          <img
            :src="service.image"
            :alt="service.alt"
            width="900"
            height="1000"
            loading="lazy"
          />
          <figcaption>旅行场景示意 · {{ service.label }}</figcaption>
        </figure>
        <div class="split-copy">
          <span class="eyebrow">{{ service.english }}</span
          ><span class="service-name">{{ service.label }}</span>
          <h2>{{ service.title }}</h2>
          <p>{{ service.description }}</p>
          <ul class="feature-list">
            <li v-for="feature in service.features" :key="feature">
              <span aria-hidden="true">✓</span>{{ feature }}
            </li>
          </ul>
          <NuxtLink to="#mini-program" class="text-link"
            >了解小程序体验 <span aria-hidden="true">↗</span></NuxtLink
          >
        </div>
      </div>
    </section>
    <section class="section container">
      <SectionHeading
        eyebrow="FROM MOMENT TO MEMORY"
        title="旅行记忆，从这里开始。"
        description="以下为照片与短视频拍摄流程；AI 视频根据具体模板要求提供素材。"
      /><JourneySteps />
    </section>
    <section id="mini-program" class="section section-soft">
      <div class="container product-intro">
        <div class="product-emblem">
          <img
            src="/brand-icon.png"
            width="128"
            height="128"
            alt="旅艺拍品牌图标"
            loading="lazy"
          /><span>旅艺拍小程序</span>
          <p>发现 · 预约 · 收藏</p>
        </div>
        <div>
          <SectionHeading
            eyebrow="WITH YOU, EVERY STEP"
            title="旅拍的每一步，都在小程序里。"
            description="浏览公开作品与景区点位，了解拍摄服务，查看订单和自己的成片。把旅行中的灵感与记忆，放在同一个地方。"
          /><MiniProgramEntry />
          <p class="small-note">
            具体服务内容、可预约景区与交付说明，以小程序实际展示为准。
          </p>
        </div>
      </div>
    </section>
    <CooperationBanner />
  </div>
</template>
