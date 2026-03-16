import { NextResponse } from "next/server";
import { hasSupabaseEnv } from "@/lib/env";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { CartItem } from "@/lib/types";

type CreateOrderPayload = {
  customerName?: string;
  customerPhone?: string;
  diningMode?: "pickup" | "dine_in";
  notes?: string;
  items?: CartItem[];
};

function isValidPhone(value: string) {
  return /^[0-9+\-\s]{6,20}$/.test(value);
}

export async function POST(request: Request) {
  if (!hasSupabaseEnv) {
    return NextResponse.json(
      { ok: false, message: "Supabase 尚未配置，当前无法保存订单。" },
      { status: 503 }
    );
  }

  const payload = (await request.json()) as CreateOrderPayload;
  const supabase = await getSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json({ ok: false, message: "数据库连接不可用。" }, { status: 500 });
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false, message: "请先登录后再提交订单。" }, { status: 401 });
  }

  const customerName = payload.customerName?.trim() ?? "";
  const customerPhone = payload.customerPhone?.trim() ?? "";
  const diningMode = payload.diningMode;
  const notes = payload.notes?.trim() ?? null;
  const items = payload.items ?? [];

  if (customerName.length < 2) {
    return NextResponse.json({ ok: false, message: "请填写正确的联系人姓名。" }, { status: 400 });
  }

  if (!isValidPhone(customerPhone)) {
    return NextResponse.json({ ok: false, message: "请填写正确的联系电话。" }, { status: 400 });
  }

  if (!diningMode || !["pickup", "dine_in"].includes(diningMode)) {
    return NextResponse.json({ ok: false, message: "请选择用餐方式。" }, { status: 400 });
  }

  if (!items.length) {
    return NextResponse.json({ ok: false, message: "购物车为空，无法提交订单。" }, { status: 400 });
  }

  const itemIds = items.map((item) => item.id);
  const { data: menuItems, error: menuItemsError } = await supabase
    .from("menu_items")
    .select("id, name, price, is_available")
    .in("id", itemIds);

  if (menuItemsError || !menuItems?.length) {
    return NextResponse.json(
      { ok: false, message: "菜品数据读取失败，请稍后重试。" },
      { status: 400 }
    );
  }

  const lookup = new Map(menuItems.map((item) => [item.id, item]));
  const unavailable = items.some((item) => !lookup.get(item.id)?.is_available);
  if (unavailable) {
    return NextResponse.json(
      { ok: false, message: "购物车里有已下架菜品，请返回购物车确认。" },
      { status: 400 }
    );
  }

  const normalizedItems = items
    .map((item) => {
      const menuItem = lookup.get(item.id);
      if (!menuItem) {
        return null;
      }

      const quantity = Math.max(1, Math.floor(item.quantity));
      return {
        menu_item_id: menuItem.id,
        item_name_snapshot: menuItem.name,
        unit_price_snapshot: Number(menuItem.price),
        quantity,
        line_total: Number(menuItem.price) * quantity
      };
    })
    .filter(Boolean);

  const totalAmount = normalizedItems.reduce((sum, item) => sum + (item?.line_total ?? 0), 0);

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      customer_name: customerName,
      customer_phone: customerPhone,
      notes,
      dining_mode: diningMode,
      status: "pending",
      total_amount: totalAmount
    })
    .select("id")
    .single();

  if (orderError || !order) {
    return NextResponse.json({ ok: false, message: "订单创建失败，请稍后重试。" }, { status: 500 });
  }

  const orderItemsPayload = normalizedItems.map((item) => ({
    ...item,
    order_id: order.id
  }));

  const { error: itemsError } = await supabase.from("order_items").insert(orderItemsPayload);

  if (itemsError) {
    await supabase.from("orders").delete().eq("id", order.id);
    return NextResponse.json(
      { ok: false, message: "订单明细保存失败，请稍后再试。" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, orderId: order.id });
}
