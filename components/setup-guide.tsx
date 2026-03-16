export function SetupGuide() {
  return (
    <section className="stack-card" id="setup-guide">
      <div className="section-heading">
        <p className="section-kicker">Supabase 配置指南</p>
        <h2>把演示站接成真正可用的点单系统</h2>
      </div>

      <ol className="number-list">
        <li>在 Supabase 创建新项目，获取 Project URL 与 anon key。</li>
        <li>把 `.env.example` 里的 Supabase 环境变量填入 `.env.local` 和 Vercel。</li>
        <li>在 Supabase SQL Editor 运行 `supabase/schema.sql`，再运行 `supabase/seed.sql`。</li>
        <li>到 Authentication 打开邮箱密码登录，注册一个普通账号。</li>
        <li>在 `profiles` 表把你的账号 `role` 改成 `admin`，就能进入后台。</li>
      </ol>
    </section>
  );
}
