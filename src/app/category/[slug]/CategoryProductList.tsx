
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";

type Props = {
    products: Product[];
    categoryName: string;
};

type SortOrder = "default" | "asc" | "desc";

export default function CategoryProductList({
    products,
    categoryName,
}: Props) {
    const [sortOrder, setSortOrder] = useState<SortOrder>("default");

    const sortedProducts = useMemo(() => {
        const result = [...products];

        if (sortOrder === "asc") {
            result.sort((a, b) => a.today - b.today);
        } else if (sortOrder === "desc") {
            result.sort((a, b) => b.today - a.today);
        }

        return result;
    }, [products, sortOrder]);

    if (products.length === 0) {
        return (
            <div className="rounded-2xl border border-border bg-white px-5 py-12 text-center">
                <p className="text-lg font-bold text-foreground">
                    এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
                </p>

                <Link
                    href="/"
                    className="mt-5 inline-flex rounded-lg bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-dark"
                >
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        );
    }

    return (
        <section>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-extrabold text-foreground">
                        {categoryName}-এর পণ্য
                    </h2>
                    <p className="mt-1 text-sm text-text-muted">
                        মোট {sortedProducts.length}টি পণ্য
                    </p>
                </div>

                <label className="flex items-center gap-3 text-sm font-medium text-foreground">
                    সাজান:
                    <select
                        value={sortOrder}
                        onChange={(event) =>
                            setSortOrder(event.target.value as SortOrder)
                        }
                        className="rounded-lg border border-border bg-white px-3 py-2.5 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                    >
                        <option value="default">ডিফল্ট</option>
                        <option value="asc">দাম: কম থেকে বেশি</option>
                        <option value="desc">দাম: বেশি থেকে কম</option>
                    </select>
                </label>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
