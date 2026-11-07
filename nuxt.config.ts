// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@element-plus/nuxt"],
  css: ["~/assets/css/main.css", "~/assets/css/responsive.css"],
  app: {
    head: {
      htmlAttrs: { lang: "zh-CN" },
      title: "旅艺拍 · 为游客拍出影视级旅游短视频",
      meta: [{ name: "theme-color", content: "#18212F" }],
      link: [{ rel: "icon", type: "image/png", href: "/brand-icon.png" }],
    },
  },
});
