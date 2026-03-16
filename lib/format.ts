import type { DiningMode, OrderStatus } from "@/lib/types";

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    minimumFractionDigits: 0
  }).format(value);
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

export function getDiningModeLabel(mode: DiningMode) {
  return mode === "pickup" ? "到店自取" : "堂食";
}

export function getOrderStatusLabel(status: OrderStatus) {
  const labels: Record<OrderStatus, string> = {
    pending: "待处理",
    confirmed: "已确认",
    preparing: "制作中",
    ready: "可取餐",
    completed: "已完成",
    cancelled: "已取消"
  };

  return labels[status];
}

export function getOrderCode(orderId: string) {
  return `#${orderId.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, "")
    .replace(/\s+/g, "-");
}
