import Link from "next/link";
import { CheckoutForm } from "@/components/cart/checkout-form";
import { SetupBanner } from "@/components/setup-banner";
import { getCurrentSession } from "@/lib/auth";

export default async function CheckoutPage() {
  const session = await getCurrentSession();

  return (
    <main className="shell page-section">
      {session.setupRequired ? <SetupBanner /> : null}

      {!session.setupRequired && !session.user ? (
        <section className="empty-card">
          <p className="section-kicker">需要先登录</p>
          <h1>登录后才能提交订单。</h1>
          <p>你可以先浏览菜单和购物车，但真正下单前需要一个用户账号来保存订单记录。</p>
          <div className="inline-actions">
            <Link className="button button-primary" href="/login">
              去登录
            </Link>
            <Link className="button button-secondary" href="/register">
              先注册
            </Link>
          </div>
        </section>
      ) : null}

      {session.user ? <CheckoutForm /> : null}
    </main>
  );
}
