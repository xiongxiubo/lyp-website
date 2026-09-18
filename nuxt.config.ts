// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@element-plus/nuxt"],
  css: ["~/assets/css/main.css", "~/assets/css/responsive.css"],
  app: {
    head: {
      htmlAttrs: { lang: "zh-CN" },
      title: "旅艺拍 · 让旅行，留下你的故事",
      meta: [{ name: "theme-color", content: "#18212F" }],
      link: [{ rel: "icon", type: "image/png", href: "/brand-icon.png" }],
    },
  },
});
