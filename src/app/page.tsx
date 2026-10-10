import Link from "next/link";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";
import type { Product } from "@/lib/types";

export const instant = false;

type ProductSectionProps = {
  id?: string;
  title: string;
  subtitle: string;
  products: Product[];
  emptyMessage: string;
};

function ProductSection({
  id,
  title,
  subtitle,
  products,
  emptyMessage,
}: ProductSectionProps) {
  return (
    <section
      id={id}
      className="mx-auto max-w-6xl scroll-mt-32 px-4 py-10 sm:px-6 sm:py-14"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-text-muted sm:text-base">
          {subtitle}
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-white px-5 py-10 text-center">
          <p className="text-text-muted">{emptyMessage}</p>
        </div>
      )}
    </section>
  );
}

export default async function Home() {
  let products: Product[] = [];
  let apiError = false;

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Failed to load Bazar Dor products:", error);
    apiError = true;
  }

  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <main className="min-h-screen">
      <Hero />

      {apiError ? (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="rounded-2xl border border-red-200 bg-white p-6 text-center">
            <h2 className="text-xl font-bold text-foreground">
              পণ্যের তথ্য লোড করা যায়নি
            </h2>

            <p className="mt-2 text-sm text-text-muted">
              API সংযোগে সমস্যা হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।
            </p>

            <Link
              href="/"
              className="mt-5 inline-flex rounded-lg bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-dark"
            >
              আবার চেষ্টা করুন
            </Link>
          </div>
        </section>
      ) : (
        <>
          <ProductSection
            id="price-risers"
            title="আজ দাম বেড়েছে ▲"
            subtitle="গত দিনের তুলনায় যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে।"
            products={risers}
            emptyMessage="দাম বেড়েছে এমন কোনো পণ্য পাওয়া যায়নি।"
          />

          <div className="border-y border-border bg-surface-soft">
            <ProductSection
              id="price-fallers"
              title="আজ দাম কমেছে ▼"
              subtitle="গত দিনের তুলনায় যেসব পণ্যের দাম সবচেয়ে বেশি কমেছে।"
              products={fallers}
              emptyMessage="দাম কমেছে এমন কোনো পণ্য পাওয়া যায়নি।"
            />
          </div>

          <ProductSection
            id="all-products"
            title="সব পণ্য"
            subtitle={`নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম এক নজরে দেখুন। মোট ${products.length}টি পণ্য পাওয়া গেছে।`}
            products={products}
            emptyMessage="কোনো পণ্যের তথ্য পাওয়া যায়নি।"
          />
        </>
      )}

      <footer className="border-t border-border bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-extrabold text-brand">
              বাজার দর
            </p>
            <p className="mt-1 text-sm text-text-muted">
              প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>

          <p className="max-w-xl text-sm leading-6 text-text-muted md:text-right">
            সকল দাম সম্ভাব্য; বাজারের অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>
      </footer>
    </main>
  );
}