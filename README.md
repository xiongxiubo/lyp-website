# 旅艺拍品牌官网

基于 Nuxt 4、Vue 3、TypeScript 和 Element Plus 的中文企业官网，默认开启 SSR。

## 本地开发

```bash
bun install
bun run dev
```

默认访问 `http://localhost:3000`。

## 校验与构建

```bash
bun run type-check
bun run build
bun run preview
```

使用 TypeScript 5.9，与当前 `vue-tsc` 配合检查 Nuxt 页面与组件。升级 TypeScript 前需先确认 Vue 工具兼容性。

## 页面

| 路由             | 内容                                      |
| ---------------- | ----------------------------------------- |
| `/`              | 品牌首页                                  |
| `/services`      | 产品与服务；照片、短视频、AI 视频介绍     |
| `/partners`      | 景区合作                                  |
| `/photographers` | 摄影师服务及摄影师端介绍                  |
| `/about`         | 品牌介绍；`#contact` 为联系与合作方向区域 |

导航、服务内容及站点信息统一维护于 `app/data/site.ts`。共享布局位于 `app/layouts`，展示组件位于 `app/components`。品牌基础样式与响应式样式分别位于 `app/assets/css/main.css` 和 `responsive.css`。

## 补充正式资料

修改 `app/data/site.ts` 中的 `site`：

| 配置                      | 填写内容                                                | 展示位置                 |
| ------------------------- | ------------------------------------------------------- | ------------------------ |
| `miniProgramQrCode`       | 存在于 `public` 的二维码路径，如 `/mini-program-qr.png` | 服务页、关于页的扫码弹窗 |
| `photographerDownloadUrl` | 正式 HTTPS 下载地址                                     | 摄影师页下载按钮         |
| `businessPhone`           | 商务电话                                                | 关于页电话链接           |
| `businessEmail`           | 商务邮箱                                                | 关于页邮件链接           |
| `address`                 | 对外公司地址                                            | 关于页联系区域           |
| `icpNumber`               | 真实备案号                                              | 页脚及备案网站链接       |

以上字段默认为空，未配置的入口隐藏。二维码、下载地址以及备案资料请在发布前逐项核实。本版不提供申请表单，也不请求业务后端。

## 素材

`public/logo.png` 和 `public/lyp-logo.png` 为原始品牌素材，保持不变。`brand-icon.png` 与 `favicon.ico` 从原始图标生成。

摄影素材以 WebP 保存在 `public/images`；来源、许可与用途见 `ASSET_SOURCES.md`。页面中的照片均为旅行场景示意，不代表旅艺拍客户作品或合作景区。替换图片时同步更新替代文本、裁切位置和来源记录。

## 人工验收

- 直接访问并刷新五个路由，检查标题、描述、导航高亮与链接。
- 在 375px、768px、1440px 检查无横向溢出，摄影图片、Logo 和文字显示完整。
- 用键盘打开移动菜单、切换页面、关闭菜单，检查焦点反馈和跳转到正文入口。
- 检查减少动态效果设置及浏览器控制台，确保没有水合错误。
- 配置正式资料后，检查二维码内容和实际电话、邮件、下载、备案链接。

不新增或维护自动化测试文件，不提交 `.nuxt`、`.output` 或 `node_modules`。
