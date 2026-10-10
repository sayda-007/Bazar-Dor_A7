
import Link from "next/link";
import type { Product } from "@/lib/types";
import {
  formatPrice,
  formatPriceChange,
  formatUnit,
} from "@/lib/format";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const direction = product.change.dir;

  const changeColor =
    direction === "up"
      ? "bg-green-50 text-green-700"
      : direction === "down"
        ? "bg-red-50 text-red-600"
        : "bg-gray-100 text-gray-600";

  return (
    <Link
      href={`/product/${product.slug}`}
      aria-label={`${product.nameBn}, ${formatPrice(product.today)}`}
      className="group flex h-full flex-col rounded-2xl border border-border bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-md sm:p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-light text-4xl">
          <span aria-hidden="true">{product.image || "🛒"}</span>
        </div>

        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${changeColor}`}>
          {formatPriceChange(direction, product.change.pct)}
        </span>
      </div>

      <div className="mt-4 flex-1">
        <p className="text-xs font-medium text-text-muted">
          {product.categoryNameBn}
        </p>

        <h3 className="mt-1 text-lg font-bold text-foreground transition group-hover:text-brand">
          {product.nameBn}
        </h3>

        <p className="mt-1 text-sm text-text-muted">
          {formatUnit(product.unit)}
        </p>
      </div>

      <div className="mt-4 border-t border-border pt-3">
        <p className="text-xs text-text-muted">আজকের দাম</p>

        <p className="mt-1 text-lg font-extrabold text-brand">
          {formatPrice(product.today)}
        </p>

        <p className="mt-1 text-xs text-text-muted">
          বাজারভিত্তিক দাম দেখতে →
        </p>
      </div>
    </Link>
  );
}
