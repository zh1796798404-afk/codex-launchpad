import { OrdersManager } from "@/components/admin/orders-manager";
import { getAdminOrders } from "@/lib/data";

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();

  return (
    <main className="shell page-section admin-shell">
      <OrdersManager orders={orders} />
    </main>
  );
}
