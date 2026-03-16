"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { formatCurrency } from "@/lib/format";

export function CartPageClient() {
  const { items, subtotal, removeItem, updateQuantity } = useCart();

  if (!items.length) {
    return (
      <section className="empty-card">
        <p className="section-kicker">购物车为空</p>
        <h1>先去挑几道招牌菜吧。</h1>
        <p>加入购物车后，你就可以继续填写联系人信息并提交订单。</p>
        <Link className="button button-primary" href="/menu">
          去逛菜单
        </Link>
      </section>
    );
  }

  return (
    <div className="cart-layout">
      <section className="stack-card">
        <div className="section-heading">
          <p className="section-kicker">购物车</p>
          <h1>确认本次点单内容</h1>
        </div>

        <div className="cart-list">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <div className="cart-item-meta">
                <span>{item.categoryName}</span>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
              </div>

              <div className="cart-item-actions">
                <strong>{formatCurrency(item.price)}</strong>
                <div className="quantity-row">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} type="button">
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} type="button">
                    +
                  </button>
                </div>
                <button className="button button-ghost button-small" onClick={() => removeItem(item.id)} type="button">
                  删除
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="summary-card">
        <p className="section-kicker">订单概览</p>
        <h2>本次合计</h2>
        <div className="summary-row">
          <span>菜品总计</span>
          <strong>{formatCurrency(subtotal)}</strong>
        </div>
        <div className="summary-row">
          <span>配送方式</span>
          <strong>自取 / 堂食</strong>
        </div>
        <Link className="button button-primary" href="/checkout">
          去结算
        </Link>
      </aside>
    </div>
  );
}
