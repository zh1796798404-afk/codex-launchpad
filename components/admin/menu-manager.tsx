"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { slugify } from "@/lib/format";
import type { MenuCategoryWithItems } from "@/lib/types";

type StatusMessage = { kind: "success" | "error"; text: string } | null;

export function MenuManager({ categories }: { categories: MenuCategoryWithItems[] }) {
  const router = useRouter();
  const [status, setStatus] = useState<StatusMessage>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function createCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const sortOrder = Number(formData.get("sortOrder") ?? "1");

    const response = await fetch("/api/admin/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        slug: slugify(name),
        sort_order: sortOrder
      })
    });

    const data = (await response.json()) as { message?: string };
    setStatus({
      kind: response.ok ? "success" : "error",
      text: data.message ?? (response.ok ? "分类已创建。" : "分类创建失败。")
    });
    setIsSaving(false);
    if (response.ok) {
      event.currentTarget.reset();
      router.refresh();
    }
  }

  async function createItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/menu-items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        category_id: String(formData.get("categoryId") ?? ""),
        name: String(formData.get("name") ?? ""),
        description: String(formData.get("description") ?? ""),
        price: Number(formData.get("price") ?? "0"),
        image_url: String(formData.get("imageUrl") ?? "") || null,
        sort_order: Number(formData.get("sortOrder") ?? "1"),
        is_available: formData.get("isAvailable") === "on"
      })
    });

    const data = (await response.json()) as { message?: string };
    setStatus({
      kind: response.ok ? "success" : "error",
      text: data.message ?? (response.ok ? "菜品已创建。" : "菜品创建失败。")
    });
    setIsSaving(false);
    if (response.ok) {
      event.currentTarget.reset();
      router.refresh();
    }
  }

  async function toggleAvailability(itemId: string, isAvailable: boolean) {
    const response = await fetch("/api/admin/menu-items", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: itemId,
        is_available: !isAvailable
      })
    });

    const data = (await response.json()) as { message?: string };
    setStatus({
      kind: response.ok ? "success" : "error",
      text: data.message ?? (response.ok ? "菜品状态已更新。" : "更新失败。")
    });
    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <div className="admin-grid">
      <section className="stack-card admin-form-card">
        <div className="section-heading">
          <p className="section-kicker">新增分类</p>
          <h2>先建立菜单分组</h2>
        </div>
        <form className="admin-form" onSubmit={createCategory}>
          <input name="name" placeholder="例如：招牌主食" required />
          <input defaultValue={categories.length + 1} min={1} name="sortOrder" required type="number" />
          <button className="button button-primary" disabled={isSaving} type="submit">
            添加分类
          </button>
        </form>
      </section>

      <section className="stack-card admin-form-card">
        <div className="section-heading">
          <p className="section-kicker">新增菜品</p>
          <h2>上架新的餐品</h2>
        </div>
        <form className="admin-form" onSubmit={createItem}>
          <select name="categoryId" required>
            <option value="">选择分类</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input name="name" placeholder="菜品名称" required />
          <textarea name="description" placeholder="一句卖点描述" rows={4} />
          <input min={0} name="price" placeholder="价格" required step="0.01" type="number" />
          <input name="imageUrl" placeholder="图片 URL（可选）" />
          <input defaultValue={1} min={1} name="sortOrder" required type="number" />
          <label className="checkbox-row">
            <input defaultChecked name="isAvailable" type="checkbox" />
            <span>立即上架</span>
          </label>
          <button className="button button-primary" disabled={isSaving} type="submit">
            保存菜品
          </button>
        </form>
      </section>

      <section className="stack-card admin-list-card admin-list-card-wide">
        <div className="section-heading">
          <p className="section-kicker">当前菜单</p>
          <h2>已上架与待上架菜品</h2>
        </div>

        {status ? <p className={`form-message form-message-${status.kind}`}>{status.text}</p> : null}

        <div className="admin-catalog-list">
          {categories.map((category) => (
            <div className="admin-category-block" key={category.id}>
              <div className="admin-category-head">
                <h3>{category.name}</h3>
                <span>{category.items.length} 道菜</span>
              </div>
              <div className="admin-item-list">
                {category.items.map((item) => (
                  <article className="admin-item-row" key={item.id}>
                    <div>
                      <strong>{item.name}</strong>
                      <p>{item.description}</p>
                    </div>
                    <div className="admin-item-actions">
                      <span>{item.price} 元</span>
                      <button
                        className="button button-secondary button-small"
                        onClick={() => toggleAvailability(item.id, item.is_available)}
                        type="button"
                      >
                        {item.is_available ? "下架" : "上架"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
