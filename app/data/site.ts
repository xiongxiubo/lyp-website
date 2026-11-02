export interface SiteConfig {
  name: string;
  company: string;
  miniProgramQrCode: string;
  photographerDownloadUrl: string;
  businessPhone: string;
  businessEmail: string;
  address: string;
  icpNumber: string;
}

// 填入正式资料后，对应入口会自动显示。二维码填写 public 下的路径。
export const site: SiteConfig = {
  name: "旅艺拍",
  company: "河南旅艺拍数字科技有限公司",
  miniProgramQrCode: "",
  photographerDownloadUrl: "",
  businessPhone: "",
  businessEmail: "",
  address: "",
  icpNumber: "",
};

export const navigation = [
  { label: "首页", to: "/" },
  { label: "产品与服务", to: "/services" },
  { label: "景区合作", to: "/partners" },
  { label: "摄影师入驻", to: "/photographers" },
  { label: "关于我们", to: "/about" },
];

export const services = [
  {
    id: "photo",
    label: "照片旅拍",
    english: "TRAVEL PHOTOGRAPHY",
    title: "把此刻，留成一张喜欢的照片。",
    description: "让专业摄影师记录你与风景的相遇。从旅行中的自然瞬间，到认真准备的一次出镜，找到属于你的表达。",
    image: "/images/portrait.webp",
    alt: "旅行者站在开阔的山野中欣赏风景",
    tag: "定格 · 旅行的模样",
    features: ["发现拍摄场景与点位", "选择喜欢的照片服务", "在小程序查看自己的成片"],
  },
  {
    id: "video",
    label: "短视频旅拍",
    english: "TRAVEL FILM",
    title: "让风景流动，让故事发生。",
    description: "用动态影像收藏旅途中的脚步、笑容与风声。选择喜欢的短视频拍摄服务，让一次旅行拥有可以反复播放的记忆。",
    image: "/images/coast.webp",
    alt: "阳光下泛起波纹的蔚蓝海面",
    tag: "记录 · 有声有色的旅程",
    features: ["浏览短视频作品与拍摄服务", "了解拍摄点位与服务内容", "查看并分享已交付的视频"],
  },
  {
    id: "ai",
    label: "AI 视频",
    english: "CREATIVE IMAGING",
    title: "为旅行记忆，打开另一种想象。",
    description: "从喜欢的 AI 视频模板出发，探索旅行影像的更多表达。让熟悉的旅行记忆，多一种打开方式。",
    image: "/images/mountains.webp",
    alt: "云雾与层叠山峰形成的自然画面",
    tag: "探索 · 影像的更多可能",
    features: ["发现 AI 视频模板", "了解模板效果与素材要求", "在小程序查看生成的成片"],
  },
];

export const journey = [
  {
    title: "发现心动场景",
    description: "浏览景区、拍摄点位与公开作品，找到喜欢的旅行表达。",
  },
  {
    title: "选择拍摄服务",
    description: "了解服务内容和拍摄说明，在小程序中完成选择与预约。",
  },
  {
    title: "享受拍摄时光",
    description: "与摄影师一起，在真实的旅行场景里留下自然的自己。",
  },
  {
    title: "收藏旅行成片",
    description: "在小程序查看交付的照片与视频，收藏并分享旅行记忆。",
  },
];
