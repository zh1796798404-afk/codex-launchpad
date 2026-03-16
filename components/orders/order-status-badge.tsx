import { getOrderStatusLabel } from "@/lib/format";
import type { OrderStatus } from "@/lib/types";

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return <span className={`status-badge status-${status}`}>{getOrderStatusLabel(status)}</span>;
}
