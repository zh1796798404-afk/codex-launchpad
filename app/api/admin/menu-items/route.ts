import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session.user || !session.isAdmin) {
    return NextResponse.json({ message: "无权限执行该操作。" }, { status: 403 });
  }

  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ message: "数据库连接不可用。" }, { status: 500 });
  }

  const payload = (await request.json()) as {
    category_id?: string;
    name?: string;
    description?: string;
    price?: number;
    image_url?: string | null;
    sort_order?: number;
    is_available?: boolean;
  };

  const name = payload.name?.trim() ?? "";
  if (name.length < 2 || !payload.category_id) {
    return NextResponse.json({ message: "请填写完整的菜品信息。" }, { status: 400 });
  }

  const { error } = await supabase.from("menu_items").insert({
    category_id: payload.category_id,
    name,
    description: payload.description?.trim() ?? "",
    price: Number(payload.price ?? 0),
    image_url: payload.image_url?.trim() || null,
    sort_order: Number(payload.sort_order ?? 1),
    is_available: Boolean(payload.is_available)
  });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "菜品已创建。" });
}

export async function PATCH(request: Request) {
  const session = await requireAdminSession();
  if (!session.user || !session.isAdmin) {
    return NextResponse.json({ message: "无权限执行该操作。" }, { status: 403 });
  }

  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ message: "数据库连接不可用。" }, { status: 500 });
  }

  const payload = (await request.json()) as {
    id?: string;
    is_available?: boolean;
  };

  if (!payload.id) {
    return NextResponse.json({ message: "缺少菜品 ID。" }, { status: 400 });
  }

  const { error } = await supabase
    .from("menu_items")
    .update({
      is_available: Boolean(payload.is_available)
    })
    .eq("id", payload.id);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "菜品状态已更新。" });
}
