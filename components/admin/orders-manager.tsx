"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatCurrency, formatDateTime, getDiningModeLabel, getOrderCode } from "@/lib/format";
import type { OrderStatus, OrderSummary } from "@/lib/types";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";

const statusOptions: Array<{ value: OrderStatus; label: string }> = [
  { value: "pending", label: "待处理" },
  { value: "confirmed", label: "已确认" },
  { value: "preparing", label: "制作中" },
  { value: "ready", label: "可取餐" },
  { value: "completed", label: "已完成" },
  { value: "cancelled", label: "已取消" }
];

export function OrdersManager({ orders }: { orders: OrderSummary[] }) {
  const router = useRouter();
  const [message, setMessage] = useState("");

  async function updateStatus(orderId: string, status: OrderStatus) {
    const response = await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: orderId, status })
    });

    const data = (await response.json()) as { message?: string };
    setMessage(data.message ?? (response.ok ? "订单状态已更新。" : "订单状态更新失败。"));
    if (response.ok) {
      router.refresh();
    }
  }

  if (!orders.length) {
    return (
      <section className="empty-card">
        <p className="section-kicker">还没有用户下单</p>
        <h1>后台订单列表会在这里出现。</h1>
        <p>等用户提交第一笔订单后，管理员就能在这里确认、制作并更新状态。</p>
      </section>
    );
  }

  return (
    <section className="stack-card">
      <div className="section-heading">
        <p className="section-kicker">订单管理</p>
        <h1>最新订单与处理状态</h1>
      </div>

      {message ? <p className="form-message form-message-success">{message}</p> : null}

      <div className="admin-order-list">
        {orders.map((order) => (
          <article className="admin-order-card" key={order.id}>
            <div className="admin-order-top">
              <div>
                <p className="order-code">{getOrderCode(order.id)}</p>
                <h2>{order.customer_name}</h2>
                <p className="order-meta">
                  {formatDateTime(order.created_at)} · {getDiningModeLabel(order.dining_mode)} ·{" "}
                  {order.customer_phone}
                </p>
              </div>
              <div className="admin-order-side">
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

            <div className="status-controls">
              {statusOptions.map((option) => (
                <button
                  className={`status-chip${order.status === option.value ? " status-chip-active" : ""}`}
                  key={option.value}
                  onClick={() => updateStatus(order.id, option.value)}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
