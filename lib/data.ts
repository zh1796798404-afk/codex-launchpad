import { sampleMenu } from "@/lib/mock-data";
import type {
  MenuCategory,
  MenuCategoryWithItems,
  MenuItem,
  OrderSummary
} from "@/lib/types";
import { hasSupabaseEnv } from "@/lib/env";
import { getSupabaseServerClient } from "@/lib/supabase/server";

function groupMenuData(categories: MenuCategory[], items: MenuItem[]) {
  return categories.map((category) => ({
    ...category,
    items: items
      .filter((item) => item.category_id === category.id)
      .sort((left, right) => left.sort_order - right.sort_order)
  }));
}

export async function getMenuData(includeUnavailable = false): Promise<MenuCategoryWithItems[]> {
  if (!hasSupabaseEnv) {
    return includeUnavailable
      ? sampleMenu
      : sampleMenu.map((category) => ({
          ...category,
          items: category.items.filter((item) => item.is_available)
        }));
  }

  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return sampleMenu;
  }

  const [{ data: categories, error: categoriesError }, { data: items, error: itemsError }] =
    await Promise.all([
      supabase.from("menu_categories").select("id, name, slug, sort_order").order("sort_order"),
      supabase
        .from("menu_items")
        .select(
          "id, category_id, name, description, price, image_url, is_available, sort_order, created_at"
        )
        .order("sort_order")
    ]);

  if (categoriesError || itemsError || !categories || !items) {
    return sampleMenu;
  }

  return groupMenuData(
    categories,
    includeUnavailable ? items : items.filter((item) => item.is_available)
  );
}

export async function getFeaturedItems() {
  const sections = await getMenuData(false);
  return sections.flatMap((section) => section.items).slice(0, 4);
}

export async function getUserOrders(userId: string): Promise<OrderSummary[]> {
  if (!hasSupabaseEnv) {
    return [];
  }

  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("orders")
    .select(
      "id, user_id, customer_name, customer_phone, notes, dining_mode, status, total_amount, created_at, order_items(id, order_id, menu_item_id, item_name_snapshot, unit_price_snapshot, quantity, line_total)"
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map((order) => ({
    ...order,
    items: order.order_items ?? []
  }));
}

export async function getAdminOrders(): Promise<OrderSummary[]> {
  if (!hasSupabaseEnv) {
    return [];
  }

  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("orders")
    .select(
      "id, user_id, customer_name, customer_phone, notes, dining_mode, status, total_amount, created_at, order_items(id, order_id, menu_item_id, item_name_snapshot, unit_price_snapshot, quantity, line_total)"
    )
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map((order) => ({
    ...order,
    items: order.order_items ?? []
  }));
}
