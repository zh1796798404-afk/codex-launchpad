import Link from "next/link";

export function SetupBanner({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`setup-banner${compact ? " setup-banner-compact" : ""}`}>
      <p className="section-kicker">还差一步配置</p>
      <h2>继续使用登录、下单和后台管理前，请先连接 Supabase。</h2>
      <p>
        当前页面会展示演示菜单和视觉效果，但真实的用户注册、订单保存、管理员权限和后台管理
        需要你在 Supabase 中创建项目并配置环境变量。
      </p>
      <div className="inline-actions">
        <Link className="button button-primary" href="https://supabase.com/dashboard" target="_blank">
          打开 Supabase
        </Link>
        <Link className="button button-secondary" href="/#setup-guide">
          查看站内配置说明
        </Link>
      </div>
    </section>
  );
}
