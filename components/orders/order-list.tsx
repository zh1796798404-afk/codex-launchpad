import { formatCurrency, formatDateTime, getDiningModeLabel, getOrderCode } from "@/lib/format";
import type { OrderSummary } from "@/lib/types";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";

export function OrderList({ orders, emptyTitle }: { orders: OrderSummary[]; emptyTitle: string }) {
  if (!orders.length) {
    return (
      <section className="empty-card">
        <p className="section-kicker">还没有订单</p>
        <h1>{emptyTitle}</h1>
        <p>提交第一笔订单后，这里会展示每一单的状态、金额与菜品明细。</p>
      </section>
    );
  }

  return (
    <div className="stack-list">
      {orders.map((order) => (
        <article className="order-card" key={order.id}>
          <div className="order-card-top">
            <div>
              <p className="order-code">{getOrderCode(order.id)}</p>
              <h2>{order.customer_name}</h2>
              <p className="order-meta">
                {formatDateTime(order.created_at)} · {getDiningModeLabel(order.dining_mode)}
              </p>
            </div>
            <div className="order-card-side">
              <OrderStatusBadge status={order.status} />
              <strong>{formatCurrency(order.total_amount)}</strong>
            </div>
          </div>

          <div className="order-items">
            {order.items.map((item) => (
              <div className="order-item-row" key={item.id}>
                <span>
                  {item.item_name_snapshot} x {item.quantity}
                </span>
                <strong>{formatCurrency(item.line_total)}</strong>
              </div>
            ))}
          </div>

          {order.notes ? <p className="order-notes">备注：{order.notes}</p> : null}
        </article>
      ))}
    </div>
  );
}
