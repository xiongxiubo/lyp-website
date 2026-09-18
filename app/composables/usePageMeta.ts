export function usePageMeta(title: string, description: string): void {
  useSeoMeta({
    title: `${title} · 旅艺拍`,
    description,
    ogTitle: `${title} · 旅艺拍`,
    ogDescription: description,
    ogType: "website",
    ogLocale: "zh_CN",
    twitterCard: "summary_large_image",
  });
}
