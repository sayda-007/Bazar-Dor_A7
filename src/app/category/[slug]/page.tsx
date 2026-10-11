
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryProductList from "./CategoryProductList";
import { getCategories, getProducts } from "@/lib/api";

export const instant = false;

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  let categories;

  try {
    categories = await getCategories();
  } catch (error) {
    console.error("Failed to load categories:", error);

    return (
      <main className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">
          ক্যাটাগরির তথ্য লোড করা যায়নি
        </h1>
        <Link
          href="/"
          className="mt-5 inline-block text-brand underline"
        >
          হোম পেজে ফিরে যান
        </Link>
      </main>
    );
  }

  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  let products;

  try {
    products = await getProducts(slug);
  } catch (error) {
    console.error("Failed to load category products:", error);

    return (
      <main className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">
          পণ্যের তথ্য লোড করা যায়নি
        </h1>
        <Link
          href="/"
          className="mt-5 inline-block text-brand underline"
        >
          হোম পেজে ফিরে যান
        </Link>
      </main>
    );
  }

  const filteredProducts = products.filter(
    (product) => product.category === slug
  );

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-sm text-text-muted"
        >
          <Link href="/" className="hover:text-brand">
            হোম
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">
            {category.nameBn}
          </span>
        </nav>

        <div className="mb-8 rounded-3xl border border-border bg-brand-light p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <span className="text-5xl" aria-hidden="true">
              {category.icon}
            </span>

            <div>
              <p className="text-sm font-semibold text-brand">
                পণ্যের ক্যাটাগরি
              </p>

              <h1 className="mt-1 text-3xl font-extrabold text-foreground sm:text-4xl">
                {category.nameBn}
              </h1>

              <p className="mt-2 text-sm text-text-muted">
                মোট {filteredProducts.length}টি পণ্যের আজকের দাম দেখুন।
              </p>
            </div>
          </div>
        </div>

        <CategoryProductList
          products={filteredProducts}
          categoryName={category.nameBn}
        />
      </section>
    </main>
  );
}
