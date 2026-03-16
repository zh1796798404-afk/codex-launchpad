import Link from "next/link";
import { env } from "@/lib/env";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="footer-kicker">现代餐饮点单站</p>
          <h2>{env.siteName}</h2>
          <p>
            支持菜单展示、邮箱密码登录、用户下单、管理员后台处理订单。当前部署在
            Vercel，可继续接上你自己的域名与菜品数据。
          </p>
        </div>

        <div>
          <p className="footer-title">快速入口</p>
          <div className="footer-links">
            <Link href="/menu">浏览菜单</Link>
            <Link href="/cart">购物车</Link>
            <Link href="/login">用户登录</Link>
          </div>
        </div>

        <div>
          <p className="footer-title">联系与营业</p>
          <div className="footer-links">
            <span>营业时间：11:00 - 22:00</span>
            <span>联系电话：400-805-1024</span>
            <span>联系邮箱：{env.contactEmail}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
