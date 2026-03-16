insert into public.menu_categories (name, slug, sort_order)
values
  ('招牌主食', 'signature', 1),
  ('小食与前菜', 'small-plates', 2),
  ('手作饮品', 'drinks', 3)
on conflict (slug) do nothing;

with categories as (
  select id, slug from public.menu_categories
)
insert into public.menu_items (category_id, name, description, price, sort_order, is_available)
values
  ((select id from categories where slug = 'signature'), '炭烤牛肋饭', '低温慢烤牛肋配黑椒汁、焦糖洋葱与温泉蛋。', 58, 1, true),
  ((select id from categories where slug = 'signature'), '柚香脆鸡饭', '外脆里嫩的鸡腿排，搭配柚子酱与香草时蔬。', 42, 2, true),
  ((select id from categories where slug = 'small-plates'), '海盐松露薯条', '现炸粗薯条撒上海盐、帕玛森芝士与少量松露油。', 26, 1, true),
  ((select id from categories where slug = 'small-plates'), '炙烤南瓜沙拉', '炙烤南瓜、羽衣甘蓝、坚果碎和蜂蜜油醋汁。', 28, 2, true),
  ((select id from categories where slug = 'drinks'), '白桃气泡茶', '白桃乌龙冷泡茶加入气泡，口感清爽干净。', 18, 1, true),
  ((select id from categories where slug = 'drinks'), '海盐焦糖拿铁', '双份浓缩、奶泡和海盐焦糖酱的平衡风味。', 24, 2, true)
on conflict do nothing;
