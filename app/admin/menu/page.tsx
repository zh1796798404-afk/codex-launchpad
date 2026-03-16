import { MenuManager } from "@/components/admin/menu-manager";
import { getMenuData } from "@/lib/data";

export default async function AdminMenuPage() {
  const categories = await getMenuData(true);

  return (
    <main className="shell page-section admin-shell">
      <div className="section-heading">
        <p className="section-kicker">菜单后台</p>
        <h1>上架、下架并维护你的菜品结构</h1>
      </div>
      <MenuManager categories={categories} />
    </main>
  );
}
