import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { OrderStatus } from "@/lib/types";

const validStatuses: OrderStatus[] = [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "completed",
  "cancelled"
];

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
    status?: OrderStatus;
  };

  if (!payload.id || !payload.status || !validStatuses.includes(payload.status)) {
    return NextResponse.json({ message: "订单状态参数无效。" }, { status: 400 });
  }

  const { error } = await supabase
    .from("orders")
    .update({ status: payload.status })
    .eq("id", payload.id);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "订单状态已更新。" });
}
