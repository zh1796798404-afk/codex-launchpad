import Link from "next/link";
import { getCurrentSession } from "@/lib/auth";
import { env } from "@/lib/env";
import { CartLink } from "@/components/ui/cart-link";
import { LogoutButton } from "@/components/ui/logout-button";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/menu", label: "菜单" },
  { href: "/orders", label: "我的订单" }
];

export async function SiteHeader() {
  const session = await getCurrentSession();

  return (
    <header className="site-header">
      <div className="shell site-header-inner">
        <Link className="brand-mark" href="/">
          <span className="brand-mark-icon">火</span>
          <span>
            <strong>{env.siteName}</strong>
            <small>Kitchen Studio</small>
          </span>
        </Link>

        <nav className="site-nav">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          {session.profile?.role === "admin" ? <Link href="/admin">后台</Link> : null}
        </nav>

        <div className="header-actions">
          <CartLink />
          {session.user ? (
            <div className="auth-pill">
              <span>{session.profile?.email ?? session.user.email}</span>
              <LogoutButton />
            </div>
          ) : (
            <div className="header-auth-links">
              <Link href="/login">登录</Link>
              <Link className="button button-small button-primary" href="/register">
                注册
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
