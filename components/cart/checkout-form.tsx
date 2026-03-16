"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useCart } from "@/components/cart-provider";
import { hasSupabaseEnv } from "@/lib/env";
import { formatCurrency } from "@/lib/format";

export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!items.length) {
      setMessage("你的购物车还是空的，先去选几道菜吧。");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      customerName: String(formData.get("customerName") ?? ""),
      customerPhone: String(formData.get("customerPhone") ?? ""),
      diningMode: String(formData.get("diningMode") ?? ""),
      notes: String(formData.get("notes") ?? ""),
      items
    };

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = (await response.json()) as { ok?: boolean; orderId?: string; message?: string };

    if (!response.ok || !data.ok || !data.orderId) {
      setMessage(data.message ?? "下单失败，请检查登录状态和数据库配置。");
      setIsSubmitting(false);
      return;
    }

    clearCart();
    router.push(`/orders?created=${data.orderId}`);
    router.refresh();
  }

  if (!hasSupabaseEnv) {
    return (
      <section className="empty-card">
        <p className="section-kicker">未启用持久化</p>
        <h1>还不能真正提交订单。</h1>
        <p>请先配置 Supabase 环境变量与数据库表结构，之后这里就会写入真实订单。</p>
      </section>
    );
  }

  return (
    <div className="checkout-layout">
      <section className="stack-card">
        <div className="section-heading">
          <p className="section-kicker">填写订单信息</p>
          <h1>最后一步，提交你的餐饮订单</h1>
        </div>

        <form className="auth-form checkout-form" onSubmit={handleSubmit}>
          <label>
            <span>联系人姓名</span>
            <input name="customerName" placeholder="张三" required />
          </label>

          <label>
            <span>联系电话</span>
            <input name="customerPhone" placeholder="13800000000" required />
          </label>

          <label>
            <span>用餐方式</span>
            <select defaultValue="pickup" name="diningMode" required>
              <option value="pickup">到店自取</option>
              <option value="dine_in">堂食</option>
            </select>
          </label>

          <label>
            <span>备注</span>
            <textarea name="notes" placeholder="例如：少冰、不要香菜、12:30 左右来取" rows={5} />
          </label>

          <button className="button button-primary" disabled={isSubmitting} type="submit">
            {isSubmitting ? "提交中..." : "提交订单"}
          </button>
        </form>

        {message ? <p className="form-message">{message}</p> : null}
      </section>

      <aside className="summary-card">
        <p className="section-kicker">结算清单</p>
        <h2>{items.length} 件商品</h2>
        <div className="checkout-preview">
          {items.map((item) => (
            <div className="summary-row" key={item.id}>
              <span>
                {item.name} x {item.quantity}
              </span>
              <strong>{formatCurrency(item.price * item.quantity)}</strong>
            </div>
          ))}
        </div>
        <div className="summary-row summary-total">
          <span>合计</span>
          <strong>{formatCurrency(subtotal)}</strong>
        </div>
        <Link className="button button-secondary" href="/cart">
          返回购物车
        </Link>
      </aside>
    </div>
  );
}
