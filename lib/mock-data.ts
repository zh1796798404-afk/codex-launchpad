import type { MenuCategoryWithItems } from "@/lib/types";

export const sampleMenu: MenuCategoryWithItems[] = [
  {
    id: "cat-signature",
    name: "招牌主食",
    slug: "signature",
    sort_order: 1,
    items: [
      {
        id: "item-charcoal-rice",
        category_id: "cat-signature",
        name: "炭烤牛肋饭",
        description: "低温慢烤牛肋配黑椒汁、焦糖洋葱与温泉蛋。",
        price: 58,
        image_url: null,
        is_available: true,
        sort_order: 1
      },
      {
        id: "item-citrus-chicken",
        category_id: "cat-signature",
        name: "柚香脆鸡饭",
        description: "外脆里嫩的鸡腿排，搭配柚子酱与香草时蔬。",
        price: 42,
        image_url: null,
        is_available: true,
        sort_order: 2
      }
    ]
  },
  {
    id: "cat-small-plates",
    name: "小食与前菜",
    slug: "small-plates",
    sort_order: 2,
    items: [
      {
        id: "item-fries",
        category_id: "cat-small-plates",
        name: "海盐松露薯条",
        description: "现炸粗薯条撒上海盐、帕玛森芝士与少量松露油。",
        price: 26,
        image_url: null,
        is_available: true,
        sort_order: 1
      },
      {
        id: "item-salad",
        category_id: "cat-small-plates",
        name: "炙烤南瓜沙拉",
        description: "炙烤南瓜、羽衣甘蓝、坚果碎和蜂蜜油醋汁。",
        price: 28,
        image_url: null,
        is_available: true,
        sort_order: 2
      }
    ]
  },
  {
    id: "cat-drinks",
    name: "手作饮品",
    slug: "drinks",
    sort_order: 3,
    items: [
      {
        id: "item-sparkling-tea",
        category_id: "cat-drinks",
        name: "白桃气泡茶",
        description: "白桃乌龙冷泡茶加入气泡，口感清爽干净。",
        price: 18,
        image_url: null,
        is_available: true,
        sort_order: 1
      },
      {
        id: "item-latte",
        category_id: "cat-drinks",
        name: "海盐焦糖拿铁",
        description: "双份浓缩、奶泡和海盐焦糖酱的平衡风味。",
        price: 24,
        image_url: null,
        is_available: true,
        sort_order: 2
      }
    ]
  }
];

export const sampleStoryStats = [
  { label: "今日新鲜备餐", value: "11:00 - 22:00" },
  { label: "平均出餐时间", value: "12 分钟" },
  { label: "本周招牌套餐", value: "3 组" }
];
