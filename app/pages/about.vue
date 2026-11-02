<script setup lang="ts">
import { site } from "~/data/site";
usePageMeta(
  "关于我们",
  "旅艺拍由河南旅艺拍数字科技有限公司运营，连接旅行者、摄影师与目的地，让旅行留下值得收藏的影像故事。",
);
const hasContact = Boolean(
  site.businessPhone || site.businessEmail || site.address,
);
</script>

<template>
  <div>
    <PageHero eyebrow="ABOUT LÜYIPAI / 关于我们" title="每一程，都值得被记住。" description="我们记录旅行，也珍视每一个出发的人。"
      image="/images/mountains.webp" alt="日光下延伸至远方的山峰" />
    <section class="section container about-story">
      <div>
        <span class="eyebrow">OUR STORY</span>
        <h2>旅，是奔赴。<br />艺，是表达。<br />拍，是珍藏。</h2>
      </div>
      <div>
        <h3>让旅行中的你，也成为风景。</h3>
        <p>
          人们因风景而出发，却常常因旅途中的某个瞬间，记住一座城市、一段山路、一次相遇。
        </p>
        <p>
          旅艺拍希望用影像留住这些瞬间。我们连接旅行者、摄影师与目的地，将照片、短视频和
          AI 视频融入旅行体验，让每个人都有机会找到自己的表达。
        </p>
        <p>
          从发现喜欢的场景，到选择拍摄服务，再到收藏成片，我们让旅行与记录，在同一段旅程里发生。
        </p>
        <div class="company-signature">
          <img src="/brand-icon.png" width="40" height="40" alt="" loading="lazy" /><span>{{ site.company }}</span>
        </div>
      </div>
    </section>
    <section class="section section-soft">
      <div class="container">
        <SectionHeading eyebrow="WHAT CONNECTS US" title="因为同一份热爱，我们相遇。" centered />
        <div class="value-grid">
          <article>
            <h3>为旅行者，留住此刻</h3>
            <p>
              让记录成为旅行体验的一部分，带走有自己、有情绪、有故事的影像。
            </p>
          </article>
          <article>
            <h3>为摄影师，连接现场</h3>
            <p>让专业与热爱走进目的地，在真实的相遇中发现值得记录的瞬间。</p>
          </article>
          <article>
            <h3>为目的地，呈现魅力</h3>
            <p>从游客的视角，让景区里的风景与体验，拥有更多生动的表达。</p>
          </article>
        </div>
      </div>
    </section>
    <section id="contact" class="section container contact-section">
      <div>
        <SectionHeading eyebrow="LET’S CONNECT" title="一起，把故事带向远方。"
          description="欢迎了解旅艺拍。无论你关注旅行体验、摄影师服务，还是景区合作，都可以从这里找到方向。" />
        <div v-if="hasContact" class="contact-details">
          <a v-if="site.businessPhone" :href="`tel:${site.businessPhone}`"><span>商务电话</span>{{ site.businessPhone
            }}</a><a v-if="site.businessEmail" :href="`mailto:${site.businessEmail}`"><span>商务邮箱</span>{{
              site.businessEmail }}</a>
          <p v-if="site.address"><span>公司地址</span>{{ site.address }}</p>
        </div>
        <MiniProgramEntry />
      </div>
      <div class="contact-directions">
        <NuxtLink to="/services">
          <div>
            <span>我是旅行者</span>
            <p>了解服务与小程序体验</p>
          </div>
          <span aria-hidden="true">↗</span>
        </NuxtLink>
        <NuxtLink to="/photographers">
          <div>
            <span>我是摄影师</span>
            <p>了解摄影师端与服务流程</p>
          </div>
          <span aria-hidden="true">↗</span>
        </NuxtLink>
        <NuxtLink to="/partners">
          <div>
            <span>我是景区合作伙伴</span>
            <p>了解景区服务与协作方式</p>
          </div>
          <span aria-hidden="true">↗</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
