import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { CartProvider } from "@/components/cart-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { env } from "@/lib/env";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display"
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: `${env.siteName} | 中文餐饮点单网站`,
  description: "单店餐饮点单网站模板，支持用户登录、管理员后台、菜单管理与订单处理。",
  metadataBase: new URL(env.siteUrl)
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${display.variable} ${sans.variable}`}>
        <CartProvider>
          <div className="app-shell">
            <SiteHeader />
            <div className="app-content">{children}</div>
            <SiteFooter />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
