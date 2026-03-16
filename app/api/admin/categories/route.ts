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
    name?: string;
    slug?: string;
    sort_order?: number;
  };

  const name = payload.name?.trim() ?? "";
  if (name.length < 2) {
    return NextResponse.json({ message: "分类名称至少 2 个字符。" }, { status: 400 });
  }

  const { error } = await supabase.from("menu_categories").insert({
    name,
    slug: payload.slug?.trim() ?? name,
    sort_order: Number(payload.sort_order ?? 1)
  });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "分类已创建。" });
}
