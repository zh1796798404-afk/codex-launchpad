import Link from "next/link";
import { getAdminOrders, getMenuData } from "@/lib/data";

export default async function AdminDashboardPage() {
  const [orders, categories] = await Promise.all([getAdminOrders(), getMenuData(true)]);
  const itemCount = categories.reduce((sum, category) => sum + category.items.length, 0);
  const availableCount = categories.reduce(
    (sum, category) => sum + category.items.filter((item) => item.is_available).length,
    0
  );

  return (
    <main className="shell page-section admin-shell">
      <div className="section-heading">
        <p className="section-kicker">管理员后台</p>
        <h1>今天的门店经营概览</h1>
      </div>

      <div className="admin-overview-grid">
        <article className="feature-card">
          <span>订单总数</span>
          <strong>{orders.length}</strong>
        </article>
        <article className="feature-card">
          <span>菜单总菜品</span>
          <strong>{itemCount}</strong>
        </article>
        <article className="feature-card">
          <span>当前上架</span>
          <strong>{availableCount}</strong>
        </article>
      </div>

      <div className="inline-actions">
        <Link className="button button-primary" href="/admin/menu">
          管理菜单
        </Link>
        <Link className="button button-secondary" href="/admin/orders">
          查看订单
        </Link>
      </div>
    </main>
  );
}
