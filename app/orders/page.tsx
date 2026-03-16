import { OrderList } from "@/components/orders/order-list";
import { SetupBanner } from "@/components/setup-banner";
import { getCurrentSession } from "@/lib/auth";
import { getUserOrders } from "@/lib/data";

export default async function OrdersPage() {
  const session = await getCurrentSession();

  if (session.setupRequired) {
    return (
      <main className="shell page-section">
        <SetupBanner />
      </main>
    );
  }

  if (!session.user) {
    return (
      <main className="shell page-section">
        <section className="empty-card">
          <p className="section-kicker">需要先登录</p>
          <h1>登录后才能查看你的订单历史。</h1>
          <p>订单会与当前用户账号绑定，登录后就能看到自己的状态变化。</p>
        </section>
      </main>
    );
  }

  const orders = await getUserOrders(session.user.id);

  return (
    <main className="shell page-section">
      <div className="section-heading">
        <p className="section-kicker">订单记录</p>
        <h1>查看你的下单历史与当前状态</h1>
      </div>
      <OrderList emptyTitle="你还没有提交过订单。" orders={orders} />
    </main>
  );
}
