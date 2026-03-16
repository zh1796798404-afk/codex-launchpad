import Link from "next/link";
import { SetupGuide } from "@/components/setup-guide";
import { SetupBanner } from "@/components/setup-banner";
import { MenuSection } from "@/components/menu/menu-section";
import { env, hasSupabaseEnv } from "@/lib/env";
import { formatCurrency } from "@/lib/format";
import { sampleStoryStats } from "@/lib/mock-data";
import { getFeaturedItems, getMenuData } from "@/lib/data";

const serviceMoments = [
  {
    title: "前台点单体验",
    description: "用户登录后即可浏览菜单、加入购物车并提交自取或堂食订单。"
  },
  {
    title: "后台订单处理",
    description: "管理员在后台查看最新订单，一键切换待处理、制作中和可取餐状态。"
  },
  {
    title: "菜单持久化管理",
    description: "使用 Supabase 持久化分类与菜品，刷新页面和重新部署都不会丢数据。"
  }
];

export default async function HomePage() {
  const [featuredItems, menuSections] = await Promise.all([getFeaturedItems(), getMenuData(false)]);

  return (
    <main>
      <section className="hero-section">
        <div className="shell hero-grid">
          <div className="hero-copy-card">
            <p className="hero-kicker">Modern Dining Commerce</p>
            <h1>{env.siteName}</h1>
            <p className="hero-copy">
              一个面向真实门店的中文点单餐饮网站模板。支持用户登录、购物车、订单列表与
              管理员后台菜单管理，既有品牌感，也能直接向实际业务靠拢。
            </p>
            <div className="inline-actions">
              <Link className="button button-primary" href="/menu">
                立即点单
              </Link>
              <Link className="button button-secondary" href="/admin">
                打开管理后台
              </Link>
            </div>
          </div>

          <div className="hero-preview-card">
            <div className="preview-topline">
              <span>Brand kitchen system</span>
              <span>V1</span>
            </div>
            <div className="hero-preview-grid">
              {featuredItems.map((item, index) => (
                <article className={`preview-dish preview-dish-${(index % 4) + 1}`} key={item.id}>
                  <span>{formatCurrency(item.price)}</span>
                  <strong>{item.name}</strong>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="shell story-strip">
        {sampleStoryStats.map((stat) => (
          <article className="story-stat" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </section>

      {!hasSupabaseEnv ? (
        <section className="shell section-gap">
          <SetupBanner />
        </section>
      ) : null}

      <section className="shell section-gap">
        <div className="section-heading">
          <p className="section-kicker">业务能力</p>
          <h2>把餐饮品牌官网与点单系统合在一起</h2>
        </div>
        <div className="feature-grid">
          {serviceMoments.map((item) => (
            <article className="feature-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="shell section-gap">
        <div className="section-heading">
          <p className="section-kicker">本周招牌</p>
          <h2>从首页就能看到代表门店调性的菜品</h2>
        </div>
        <div className="menu-card-grid">
          {featuredItems.map((item, index) => (
            <article className="dish-card" key={item.id}>
              <div className={`dish-visual dish-visual-${(index % 4) + 1}`}>
                <span>Signature</span>
                <strong>{item.name}</strong>
              </div>
              <div className="dish-content">
                <div className="dish-header">
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>
                  <strong>{formatCurrency(item.price)}</strong>
                </div>
                <Link className="button button-primary" href="/menu">
                  去菜单页点这道菜
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="shell section-gap">
        <div className="section-heading">
          <p className="section-kicker">菜单预览</p>
          <h2>先给用户看品牌，再让他们顺滑进入下单</h2>
        </div>
        {menuSections.slice(0, 2).map((section) => (
          <MenuSection key={section.id} section={section} />
        ))}
      </section>

      <section className="shell section-gap">
        <SetupGuide />
      </section>
    </main>
  );
}
