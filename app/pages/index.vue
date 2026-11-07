<script setup lang="ts">
import { ArrowRight, TopRight } from "@element-plus/icons-vue";
import { services } from "~/data/site";
usePageMeta(
  "为游客拍出影视级旅游短视频",
  "旅艺拍连接旅行者、摄影师与景区，提供照片旅拍、短视频与 AI 视频服务，让每一段旅行拥有值得收藏的影像。",
);
const audiences = [
  {
    title: "致热爱旅行的你",
    subtitle: "把自己，放进风景里",
    text: "发现心动的场景，选择喜欢的拍摄方式，让镜头记住旅途中的你。",
    to: "/services",
    link: "发现旅拍服务",
    label: "FOR TRAVELERS",
  },
  {
    title: "致善于发现的你",
    subtitle: "用镜头，遇见更多故事",
    text: "让创作走进真实的旅行现场，在拍摄与交付之间，专注每一次记录。",
    to: "/photographers",
    link: "了解摄影师服务",
    label: "FOR PHOTOGRAPHERS",
  },
  {
    title: "致值得被看见的目的地",
    subtitle: "让好风景，走进好故事",
    text: "把景区特色与影像服务连接起来，为游客增添一份可以带走的旅行记忆。",
    to: "/partners",
    link: "探索景区合作",
    label: "FOR DESTINATIONS",
  },
];
</script>

<template>
  <div>
    <section class="home-hero">
      <img
        class="hero-landscape"
        src="/images/lake.webp"
        width="1800"
        height="1200"
        alt="群山环抱的湖泊与湖面上的木船"
        fetchpriority="high"
      />
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
            <ElButton tag="a" href="/services" type="primary" round size="large"
              >了解旅拍服务 <ElIcon><TopRight /></ElIcon></ElButton
            ><NuxtLink to="/partners" class="hero-secondary"
              >探索景区合作 <ElIcon><ArrowRight /></ElIcon
            ></NuxtLink>
          </div>
        </div>
        <figure class="hero-photo">
          <div class="hero-photo-top">
            <span>一程一故事</span><span aria-hidden="true">✳</span>
          </div>
          <img
            class="hero-qr"
            src="/images/mini-program-qr.jpg"
            width="640"
            height="640"
            alt="旅艺拍微信小程序码"
            fetchpriority="high"
          />
          <figcaption>
            <span>打开微信，扫一扫</span><small>旅艺拍</small>
          </figcaption>
        </figure>
        <div class="hero-bottom">
          <span>TRAVEL. CREATE. REMEMBER.</span
          ><span class="hero-bottom-note"
            >向风景出发，带故事回来 <span aria-hidden="true">↓</span></span
          >
        </div>
      </div>
      <span class="image-credit hero-credit">旅艺拍</span>
    </section>

    <section class="brand-statement container">
      <div>
        <span class="eyebrow">HELLO, WE ARE LÜYIPAI</span>
        <h2>旅途有风景，<br />记忆里有<span>你。</span></h2>
      </div>
      <div class="brand-statement-copy">
        <p>
          我们相信，旅行中最动人的，<br />不只是眼前的风景，还有身在其中的你。
        </p>
        <p>
          旅艺拍连接旅行者、摄影师与目的地，以照片、短视频和 AI
          视频，让每一种旅行心情，都找到适合的影像表达。
        </p>
        <NuxtLink to="/about" class="text-link"
          >认识旅艺拍 <span aria-hidden="true">↗</span></NuxtLink
        >
      </div>
    </section>

    <section class="section section-soft">
      <div class="container">
        <div class="section-top">
          <SectionHeading
            eyebrow="WAYS TO REMEMBER"
            title="一段旅程，不止一种记录方式。"
            description="从一张照片，到一段故事，找到属于你的旅行表达。"
          /><NuxtLink class="text-link" to="/services"
            >探索全部服务 <span aria-hidden="true">↗</span></NuxtLink
          >
        </div>
        <div class="service-grid">
          <NuxtLink
            v-for="service in services"
            :key="service.id"
            :to="`/services#${service.id}`"
            class="service-card"
            ><div class="service-image">
              <img
                :src="service.image"
                :alt="service.alt"
                width="600"
                height="720"
                loading="lazy"
              /><span class="service-image-label">{{ service.tag }}</span
              ><small>旅艺拍</small>
            </div>
            <div class="service-card-body">
              <div>
                <span class="eyebrow">{{ service.english }}</span>
                <h3>{{ service.label }}</h3>
              </div>
              <span class="circle-arrow" aria-hidden="true">↗</span>
            </div></NuxtLink
          >
        </div>
      </div>
    </section>

    <section class="section container">
      <SectionHeading
        eyebrow="BETTER TOGETHER"
        title="让每一次相遇，都有新的可能。"
        description="一份旅行记忆的背后，是旅行者、创作者与目的地的共同参与。"
        centered
      />
      <div class="audience-grid">
        <article
          v-for="audience in audiences"
          :key="audience.to"
          class="audience-card"
        >
          <span class="eyebrow">{{ audience.label }}</span>
          <p class="audience-title">{{ audience.title }}</p>
          <h3>{{ audience.subtitle }}</h3>
          <p>{{ audience.text }}</p>
          <NuxtLink :to="audience.to" class="text-link"
            >{{ audience.link }} <span aria-hidden="true">↗</span></NuxtLink
          >
        </article>
      </div>
    </section>

    <section class="section journey-section">
      <div class="container">
        <SectionHeading
          eyebrow="YOUR NEXT JOURNEY"
          title="把时间交给旅行，把记录交给我们。"
          description="从发现一个心动场景，到收藏一份旅行记忆。"
        /><JourneySteps />
      </div>
    </section>
    <CooperationBanner />
  </div>
</template>
