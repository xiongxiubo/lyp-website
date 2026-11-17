<script setup lang="ts">
type CooperationType = "city" | "scenic";

const dialogOpen = ref(false);
const cooperationType = ref<CooperationType>("city");
const videoDialogOpen = ref(false);
const activeFilm = ref<(typeof films)[number] | null>(null);
const videoRef = ref<HTMLVideoElement>();
const videoPlayError = ref(false);

function openCooperationDialog(type: CooperationType) {
  cooperationType.value = type;
  dialogOpen.value = true;
}

const films = [
  {
    index: "01",
    title: "玉楼金阙",
    location: "洛阳 · 应天门",
    image: "/images/hero-yingtian.webp",
    video: "/videos/yingtian.mp4",
    alt: "应天门夜景中的汉服旅游短视频画面",
  },
  {
    index: "02",
    title: "说洛阳",
    location: "洛阳 · 洛邑古城",
    image: "/images/hero-luoyi.webp",
    video: "/videos/luoyi.mp4",
    alt: "洛邑古城中的汉服旅游短视频画面",
  },
  {
    index: "03",
    title: "神都洛阳",
    location: "洛阳 · 九洲池",
    image: "/images/collab-jiuzhou.webp",
    video: "/videos/jiuzhou.mp4",
    alt: "九洲池夜景中的汉服旅游短视频画面",
  },
];

async function openFilm(film: (typeof films)[number]) {
  activeFilm.value = film;
  videoPlayError.value = false;
  videoDialogOpen.value = true;
  await nextTick();

  if (!videoRef.value) return;
  videoRef.value.muted = false;
  videoRef.value.volume = 1;
  try {
    await videoRef.value.play();
  } catch {
    videoPlayError.value = true;
  }
}

function resetFilm() {
  videoRef.value?.pause();
  activeFilm.value = null;
  videoPlayError.value = false;
}

const products = [
  {
    index: "01",
    title: "实拍旅游短视频",
    text: "主题样片与标准拍摄相结合，由摄影师现场服务，平台完成后期与交付。",
  },
  {
    index: "02",
    title: "AI 主题影像",
    text: "将特色主题与影像创意结合，丰富游客的旅行表达。",
  },
  {
    index: "03",
    title: "写真与城市跟拍",
    text: "按人数、场景与行程，组合写真和城市跟拍服务。",
  },
];

const productSteps = [
  ["01", "选样片", "先看喜欢的风格"],
  ["02", "下单预约", "选择套餐与时间"],
  ["03", "现场拍摄", "摄影师引导完成"],
  ["04", "平台制作", "后期与质量把控"],
  ["05", "成片交付", "留下旅行的故事"],
];

const partners = [
  {
    type: "city" as const,
    index: "01",
    title: "我是城市代理商",
    note: "连接本地资源，开展城市运营",
    heading: "把本地资源，做成旅拍业务。",
    text: "连接景区、门店与摄影师，一起开展本地旅游影像服务。",
    values: ["资源变产品", "履约有标准", "专注本地经营"],
  },
  {
    type: "scenic" as const,
    index: "02",
    title: "我是景区运营方",
    note: "丰富游客体验，打造特色内容",
    heading: "把景区特色，变成游客体验。",
    text: "从特色点位与文化故事出发，开发游客可以参与的影像产品。",
    values: ["增加可选体验", "开发特色内容", "让分享延续旅行"],
  },
];

const supports = [
  ["01", "内容与标准", "主题模板、拍摄流程与服务规范"],
  ["02", "系统与工具", "产品展示、订单流转与成片交付"],
  ["03", "培训与协作", "产品培训、运营建议与销售支持"],
  ["04", "制作与交付", "后期制作、质量把控与异常协同"],
];

const launchSteps = [
  ["01", "聊聊想法", "了解合作意向\n与本地资源"],
  ["02", "一起评估", "梳理目标客群\n与拍摄场景"],
  ["03", "确认方案", "明确产品组合\n与双方分工"],
  ["04", "准备开拍", "内容与团队准备\n试单、复盘、运营"],
];

const faqs = [
  [
    "没有摄影团队，可以合作吗？",
    "可以先沟通资源情况与团队搭建计划。城市代理商或景区运营方负责本地摄影师招募、管理和现场服务，旅艺拍提供相应标准、培训及平台支持。",
  ],
  [
    "城市代理和景区合作有什么区别？",
    "城市代理围绕授权城市开展市场、渠道与团队运营；景区合作围绕一个景区的内容产品和游客服务展开，不等同于城市或区域代理授权。",
  ],
  [
    "费用、分工和支持如何确定？",
    "根据合作类型、资源条件、内容需求和运营范围沟通具体方案。费用、交付、结算及权利义务以双方确认的正式协议为准。",
  ],
  [
    "已有小程序或销售渠道，如何衔接？",
    "可以先梳理现有产品展示、下单、支付和后台流程，再评估适合的对接范围。具体系统改造、费用及周期需另行确认。",
  ],
];
</script>

<template>
  <div class="home-collab-sections">
    <section class="home-collab-section collab-films">
      <div class="container">
        <div class="collab-heading">
          <div>
            <span class="eyebrow">01 / 看见产品</span>
            <h2>风景是背景，<br /><em>游客才是主角。</em></h2>
          </div>
          <p>先看一段旅行，如何成为一支作品。<br />以下为现有旅游短视频样片。</p>
        </div>
        <div class="collab-film-grid">
          <article v-for="film in films" :key="film.index" class="collab-film-card">
            <button type="button" class="collab-film-image" :aria-label="`播放样片：${film.title}`" @click="openFilm(film)">
              <img :src="film.image" :alt="film.alt" loading="lazy" />
              <span>{{ film.index }}</span>
              <i aria-hidden="true">▶</i>
              <small>实拍样片 · 旅艺拍</small>
            </button>
            <div class="collab-film-caption">
              <strong>{{ film.title }}</strong><span>{{ film.location }} ↗</span>
            </div>
          </article>
        </div>
        <p class="collab-note">样片展示产品风格与拍摄场景，不代表与相关景区运营方的签约合作关系。</p>
      </div>
    </section>

    <section id="product-services" class="home-collab-section collab-products">
      <div class="container">
        <div class="collab-heading">
          <div>
            <span class="eyebrow">02 / 产品与服务</span>
            <h2>一段<em>好故事，</em><br />背后是一整套服务。</h2>
          </div>
          <p>从游客喜欢的样片出发，<br />让内容、拍摄与交付连在一起。</p>
        </div>
        <div class="collab-product-layout">
          <figure class="collab-service-image">
            <img src="/images/collab-service.webp" alt="摄影师与游客沟通旅游短视频拍摄服务" loading="lazy" />
            <figcaption>品牌影像画面 · 服务流程示意</figcaption>
          </figure>
          <div class="collab-product-list">
            <article v-for="product in products" :key="product.index">
              <span>{{ product.index }}</span>
              <div>
                <h3>{{ product.title }}</h3>
                <p>{{ product.text }}</p>
              </div>
            </article>
          </div>
        </div>
        <ol class="collab-product-steps" aria-label="游客服务流程">
          <li v-for="step in productSteps" :key="step[0]"><span>{{ step[0] }}</span><strong>{{ step[1]
          }}</strong><small>{{ step[2] }}</small></li>
        </ol>
      </div>
    </section>

    <section id="collab-partners" class="home-collab-section collab-partners">
      <div class="container">
        <div class="collab-heading">
          <div>
            <span class="eyebrow">03 / 合作价值</span>
            <h2>你的资源，<br /><em>有更多可能。</em></h2>
          </div>
          <p>找到适合你的合作方式。<br />一起把想法，变成可落地的服务。</p>
        </div>
        <div class="collab-partner-grid">
          <article v-for="partner in partners" :key="partner.index" class="collab-partner-card">
            <div class="collab-partner-tab"><span>{{ partner.index }}</span><strong>{{ partner.title
            }}</strong><small>{{ partner.note }}</small><b>↗</b></div>
            <div class="collab-partner-body">
              <h3>{{ partner.heading }}</h3>
              <p>{{ partner.text }}</p><button type="button" class="text-link collab-dialog-trigger"
                @click="openCooperationDialog(partner.type)">聊聊合作方向 <span aria-hidden="true">↗</span></button>
            </div>
            <ul>
              <li v-for="(value, index) in partner.values" :key="value"><span>0{{ index + 1 }}</span>{{ value }}</li>
            </ul>
          </article>
        </div>
        <p class="collab-note">城市代理与景区项目为不同合作模式，具体范围、费用、权益与职责以双方正式协议为准。</p>
      </div>
    </section>

    <section class="home-collab-section collab-support">
      <div class="container collab-support-layout">
        <div>
          <span class="eyebrow">04 / 一起落地</span>
          <h2>好内容之外，<br />还有<em>运营的支撑。</em></h2>
          <p>从产品到履约，<br />每个环节都有人协作。</p>
        </div>
        <div class="collab-support-grid">
          <article v-for="support in supports" :key="support[0]"><span>{{ support[0] }}</span>
            <h3>{{ support[1] }}</h3>
            <p>{{ support[2] }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="home-collab-section collab-launch">
      <div class="container">
        <div class="collab-heading collab-heading-single">
          <div><span class="eyebrow">05 / 开启合作</span>
            <h2>从一次交流，<br />到一段<em>共同的旅程。</em></h2>
          </div>
        </div>
        <ol class="collab-launch-grid">
          <li v-for="step in launchSteps" :key="step[0]"><span>{{ step[0] }}</span><b>↗</b>
            <h3>{{ step[1] }}</h3>
            <p>{{ step[2] }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="home-collab-section collab-faq">
      <div class="container collab-faq-layout">
        <div><span class="eyebrow">合作前，你可能想了解</span>
          <h2>把关心的事，<br /><em>聊清楚。</em></h2>
        </div>
        <div class="collab-faq-list">
          <details v-for="faq in faqs" :key="faq[0]">
            <summary>{{ faq[0] }}<span>+</span></summary>
            <p>{{ faq[1] }}</p>
          </details>
        </div>
      </div>
    </section>
    <ElDialog v-model="videoDialogOpen" :title="activeFilm ? `${activeFilm.title} · ${activeFilm.location}` : '旅游短视频样片'"
      width="min(470px, 92vw)" align-center destroy-on-close class="sample-video-dialog" @closed="resetFilm">
      <video v-if="activeFilm" ref="videoRef" :src="activeFilm.video" :poster="activeFilm.image" controls playsinline
        autoplay preload="metadata">
        您的浏览器暂不支持视频播放。
      </video>
      <p v-if="videoPlayError" class="sample-video-notice" role="status">
        浏览器已阻止自动播放，点击播放按钮即可开启有声播放。
      </p>
    </ElDialog>
    <CooperationInquiryDialog v-model="dialogOpen" :type="cooperationType" />
  </div>
</template>
