import { AddToCartButton } from "@/components/menu/add-to-cart-button";
import { formatCurrency } from "@/lib/format";
import type { MenuCategoryWithItems } from "@/lib/types";

export function MenuSection({ section }: { section: MenuCategoryWithItems }) {
  return (
    <section className="menu-section" id={section.slug}>
      <div className="section-heading">
        <p className="section-kicker">菜单分类</p>
        <h2>{section.name}</h2>
      </div>

      <div className="menu-card-grid">
        {section.items.map((item, index) => (
          <article className="dish-card" key={item.id}>
            <div className={`dish-visual dish-visual-${(index % 4) + 1}`}>
              <span>{section.name}</span>
              <strong>{item.name}</strong>
            </div>
            <div className="dish-content">
              <div className="dish-header">
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
                <strong>{formatCurrency(item.price)}</strong>
              </div>
              <AddToCartButton categoryName={section.name} item={item} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
