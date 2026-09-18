<script setup lang="ts">
usePageMeta(
  "景区合作",
  "旅艺拍连接景区场景、摄影师与游客，以旅拍服务丰富旅行体验，为目的地留下更多值得分享的影像故事。",
);
const capabilities = [
  {
    title: "让拍摄点位被发现",
    text: "通过景区介绍与拍摄点位展示，让游客了解目的地特色，找到适合拍摄的场景。",
    label: "场景呈现",
  },
  {
    title: "让旅拍服务更清晰",
    text: "用照片与视频展示拍摄服务，帮助游客了解服务内容、拍摄方式与预约信息。",
    label: "服务连接",
  },
  {
    title: "让现场协作更有序",
    text: "连接摄影师、拍摄订单与交付作品，让旅行现场的记录与后续交付衔接起来。",
    label: "拍摄协作",
  },
  {
    title: "让运营有据可循",
    text: "围绕景区、订单与作品进行管理，结合经营与结算信息了解旅拍服务情况。",
    label: "运营管理",
  },
];
</script>

<template>
  <div>
    <PageHero
      eyebrow="FOR DESTINATIONS / 景区合作"
      title="让好风景，拥有更多好故事。"
      description="将目的地特色与旅拍服务相连接，让游客带走风景，也留下属于这里的记忆。"
      image="/images/lake.webp"
      alt="群山环抱的湖泊与旅行木船"
    />
    <section class="section container split-layout">
      <div class="split-copy">
        <SectionHeading
          eyebrow="MORE THAN A DESTINATION"
          title="从一次到访，走向一份珍藏。"
          description="旅拍，是游客体验目的地的另一种方式。我们希望与景区一起，把值得停留的地方，变成值得记录的场景。"
        />
        <p>
          以景区与拍摄点位为起点，连接可选择的影像服务和现场摄影师，让旅行者更自然地参与其中。
        </p>
        <ElButton
          tag="a"
          href="/about#contact"
          type="primary"
          round
          size="large"
          >了解合作方向 <span aria-hidden="true">↗</span></ElButton
        >
      </div>
      <figure class="editorial-image landscape-crop">
        <img
          src="/images/coast.webp"
          width="900"
          height="700"
          alt="日光下波光粼粼的海面"
          loading="lazy"
        />
        <figcaption>旅行场景示意</figcaption>
      </figure>
    </section>
    <section class="section section-soft">
      <div class="container">
        <SectionHeading
          eyebrow="CONNECTED EXPERIENCES"
          title="围绕景区体验，连接每一个环节。"
        />
        <div class="capability-grid">
          <article v-for="item in capabilities" :key="item.title">
            <span class="pill-label">{{ item.label }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>
    <section class="section container">
      <SectionHeading
        eyebrow="A SHARED JOURNEY"
        title="各展所长，让服务在现场发生。"
        centered
      />
      <div class="role-grid">
        <article>
          <span class="role-symbol" aria-hidden="true">⌖</span>
          <h3>景区与目的地</h3>
          <p>提供有特色的旅行场景，协同梳理拍摄点位与现场服务条件。</p>
        </article>
        <article>
          <img
            src="/brand-icon.png"
            width="52"
            height="52"
            alt=""
            loading="lazy"
          />
          <h3>旅艺拍平台</h3>
          <p>连接场景、服务与订单，承载作品展示、预约和成片查看。</p>
        </article>
        <article>
          <span class="role-symbol" aria-hidden="true">◎</span>
          <h3>摄影师</h3>
          <p>以专业视角记录旅行者，完成现场拍摄与作品交付。</p>
        </article>
      </div>
      <p class="section-footnote">
        具体合作形式、服务范围及结算安排，在沟通中根据实际场景确定。
      </p>
    </section>
    <CooperationBanner />
  </div>
</template>
