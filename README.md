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

## Docker 与 Caddy 部署

需要 Docker Engine 和 Docker Compose，以下命令均在 `lyp-website` 目录执行。官网独立部署：Node.js 24 容器运行 Nuxt SSR，Caddy 容器提供反向代理、压缩和 HTTPS。镜像构建使用 Bun 锁文件安装依赖，运行镜像仅包含 `.output`，以非 root 用户运行。

### 本地 HTTP 验证

首次部署复制配置文件，已有 `.env` 时直接修改：

```bash
cp .env.example .env
docker compose config --quiet
docker compose up -d --build
```

默认 `SITE_ADDRESS=:80`，启动后访问 `http://localhost`。Caddy 占用宿主机 80、443 TCP 和 443 UDP 端口；部署前确认没有其他服务占用这些端口。官网 3000 端口仅在 Compose 网络内访问，不发布到宿主机。Caddy 等待官网 HTTP 健康检查通过后启动。

### 正式域名与 HTTPS

将正式域名的 DNS A 记录指向部署服务器；如配置 AAAA 记录，也应指向可访问的服务器 IPv6 地址。放行服务器和云安全组的 80、443 TCP 端口；启用 HTTP/3 时同时放行 443 UDP。

在 `.env` 中填写实际域名和证书联系邮箱，例如：

```dotenv
SITE_ADDRESS=www.example.com
ACME_EMAIL=ops@example.com
```

正式域名不要添加 `http://`。执行 `docker compose up -d --build` 后，Caddy 自动申请、续期 HTTPS 证书，并将 HTTP 请求重定向到 HTTPS。证书和 Caddy 状态保存在 `caddy_data`、`caddy_config` 命名卷中。

### 校验与日常维护

```bash
# 校验 Compose 和 Caddy 配置（不申请证书）
docker compose config --quiet
docker compose run --rm --no-deps caddy caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile

# 查看服务状态和日志
docker compose ps
docker compose logs -f --tail=100 website caddy

# 更新源码或 .env 后，重新构建并启动
docker compose up -d --build

# 修改 Caddyfile 后，校验成功再重新加载
docker compose exec caddy caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile

# 停止并移除容器，保留证书与配置卷
docker compose down
```

不要在日常停止时添加 `down -v`，它会删除证书与配置卷。修改 `.env` 后使用 `up -d` 重建环境变量有变化的容器，仅执行 `restart` 或 Caddy reload 不会更新容器环境变量。

部署后直接访问并刷新 `/`、`/services`、`/partners`、`/photographers`、`/about`，确认页面、图片和样式正常，查看页面源代码确认包含 SSR 正文。正式域名启用后，检查 HTTPS 证书和 HTTP 自动跳转。

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
