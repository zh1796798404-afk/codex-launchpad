"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import type { MenuItem } from "@/lib/types";

export function AddToCartButton({
  item,
  categoryName
}: {
  item: MenuItem;
  categoryName: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(
      {
        id: item.id,
        name: item.name,
        description: item.description,
        image_url: item.image_url,
        price: item.price,
        categoryName
      },
      1
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <button
      className={`button ${added ? "button-dark" : "button-primary"}`}
      disabled={!item.is_available}
      onClick={handleClick}
      type="button"
    >
      {item.is_available ? (added ? "已加入购物车" : "加入购物车") : "已售罄"}
    </button>
  );
}
