"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";

export function CartLink() {
  const { itemCount } = useCart();

  return (
    <Link className="cart-link" href="/cart">
      购物车
      <span>{itemCount}</span>
    </Link>
  );
}
