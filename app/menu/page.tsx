import { MenuSection } from "@/components/menu/menu-section";
import { SetupBanner } from "@/components/setup-banner";
import { hasSupabaseEnv } from "@/lib/env";
import { getMenuData } from "@/lib/data";

export default async function MenuPage() {
  const sections = await getMenuData(false);

  return (
    <main className="shell page-section">
      <div className="section-heading">
        <p className="section-kicker">当日菜单</p>
        <h1>按分类浏览所有上架菜品</h1>
      </div>

      {!hasSupabaseEnv ? <SetupBanner compact /> : null}

      {sections.map((section) => (
        <MenuSection key={section.id} section={section} />
      ))}
    </main>
  );
}
