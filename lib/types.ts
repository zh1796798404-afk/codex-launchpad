export type UserRole = "user" | "admin";

export type DiningMode = "pickup" | "dine_in";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";

export type MenuCategory = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
};

export type MenuItem = {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  is_available: boolean;
  sort_order: number;
  created_at?: string;
};

export type MenuCategoryWithItems = MenuCategory & {
  items: MenuItem[];
};

export type CartItem = {
  id: string;
  name: string;
  description: string;
  image_url: string | null;
  price: number;
  quantity: number;
  categoryName?: string;
};

export type Profile = {
  id: string;
  email: string;
  role: UserRole;
  created_at?: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  menu_item_id: string | null;
  item_name_snapshot: string;
  unit_price_snapshot: number;
  quantity: number;
  line_total: number;
};

export type Order = {
  id: string;
  user_id: string;
  customer_name: string;
  customer_phone: string;
  notes: string | null;
  dining_mode: DiningMode;
  status: OrderStatus;
  total_amount: number;
  created_at: string;
  items?: OrderItem[];
};

export type OrderSummary = Order & {
  items: OrderItem[];
};
