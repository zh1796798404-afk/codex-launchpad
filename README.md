# 火候厨房

一个基于 `Next.js App Router + Supabase + Vercel` 的中文单店餐饮点单网站模板。

当前版本已经包含：

- 品牌首页与菜单页
- 邮箱密码注册 / 登录
- 本地购物车
- 用户下单与订单历史
- 管理员后台菜单管理
- 管理员后台订单处理
- Supabase 数据库表结构与种子数据

## 本地启动

```bash
npm install
cp .env.example .env.local
npm run dev
```

默认情况下，如果你还没配置 Supabase，前台会显示演示菜单和配置提示，但登录、下单和后台写入不会真正生效。

## 环境变量

在 `.env.local` 和 Vercel 中至少配置这些变量：

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=火候厨房
CONTACT_EMAIL=hello@example.com
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

说明：

- `NEXT_PUBLIC_SITE_URL`：站点公开地址
- `NEXT_PUBLIC_SITE_NAME`：品牌名称
- `CONTACT_EMAIL`：页脚联系邮箱
- `NEXT_PUBLIC_SUPABASE_URL`：Supabase 项目 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`：Supabase 公钥
- `SUPABASE_SERVICE_ROLE_KEY`：服务端高权限密钥，当前版本预留给后台管理场景

## Supabase 初始化

### 1. 创建项目

在 [Supabase Dashboard](https://supabase.com/dashboard) 创建一个新项目。

### 2. 打开邮箱密码登录

进入 `Authentication -> Providers -> Email`，确保 Email/Password 登录开启。

### 3. 创建数据库结构

打开 `SQL Editor`，先运行：

[`supabase/schema.sql`](/Users/sedia/Documents/codex%20workplace/supabase/schema.sql)

再运行：

[`supabase/seed.sql`](/Users/sedia/Documents/codex%20workplace/supabase/seed.sql)

### 4. 创建管理员账号

先在前台注册一个普通账号，然后到 `Table Editor -> profiles` 把这个账号的 `role` 改成 `admin`。

这样它就能访问 `/admin`。

## 页面结构

- `/` 品牌首页
- `/menu` 菜单页
- `/cart` 购物车
- `/checkout` 结算页
- `/orders` 用户订单页
- `/login` 登录
- `/register` 注册
- `/admin` 管理后台首页
- `/admin/menu` 菜单管理
- `/admin/orders` 订单管理

## 关键数据表

- `profiles`
- `menu_categories`
- `menu_items`
- `orders`
- `order_items`

订单会保存菜品名称与价格快照，所以后续改价不会影响历史订单。

## Vercel 部署

1. 把代码推到 GitHub
2. 在 Vercel 导入该仓库
3. 在 Vercel 环境变量中填入 `.env.example` 里的 Supabase 配置
4. 重新部署

部署完成后，你就可以：

- 普通用户访问站点、注册登录、下单
- 管理员登录后台上架菜品、查看和处理订单

## 本地检查

```bash
npm run lint
npm run build
```
