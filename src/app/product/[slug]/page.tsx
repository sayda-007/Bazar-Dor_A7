
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getProducts } from "@/lib/api";
import {
    formatBengaliNumber,
    formatPrice,
    formatUnit,
} from "@/lib/format";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";


type Props = {
    params: Promise<{ slug: string }>;
};

export default async function ProductDetailsPage({ params }: Props) {
    const { slug } = await params;
    

const session = await auth.api.getSession({
    headers: await headers(),
});

if (!session) {
    redirect(
        `/signin?reason=auth-required&callbackURL=${encodeURIComponent(
            `/product/${slug}`
        )}`
    );
}

let products;

try {
    products = await getProducts();
} catch (error) {
    console.error("Product API error:", error);

    return (
        <main className="mx-auto max-w-3xl px-4 py-20 text-center">
            <h1 className="text-2xl font-bold">
                পণ্যের তথ্য লোড করা যায়নি
            </h1>
            <Link href="/" className="mt-5 inline-block text-brand underline">
                হোম পেজে ফিরে যান
            </Link>
        </main>
    );
}

const product = products.find((item) => item.slug === slug);

if (!product) notFound();

const markets = product.markets ?? [];

const minimumPrices = markets
    .map((market) => market.min)
    .filter((price): price is number => typeof price === "number");

const maximumPrices = markets
    .map((market) => market.max)
    .filter((price): price is number => typeof price === "number");

const minimum = minimumPrices.length
    ? Math.min(...minimumPrices)
    : product.today;

const maximum = maximumPrices.length
    ? Math.max(...maximumPrices)
    : product.today;

const average = markets.length
    ? markets.reduce(
        (sum, market) =>
            sum +
            ((market.min ?? product.today) +
                (market.max ?? product.today)) /
            2,
        0
    ) / markets.length
    : product.today;

const changeColor =
    product.change.dir === "up"
        ? "bg-red-50 text-red-600"
        : product.change.dir === "down"
            ? "bg-green-50 text-green-700"
            : "bg-gray-100 text-gray-600";

return (
    <main className="min-h-screen">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
            <nav className="mb-6 text-sm text-text-muted">
                <Link href="/" className="hover:text-brand">হোম</Link>
                <span className="mx-2">/</span>
                <Link
                    href={`/category/${product.category}`}
                    className="hover:text-brand"
                >
                    {product.categoryNameBn}
                </Link>
                <span className="mx-2">/</span>
                <span>{product.nameBn}</span>
            </nav>

            <section className="rounded-3xl border border-border bg-white p-6 sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row">
                    <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl bg-brand-light text-6xl">
                        {product.image || "🛒"}
                    </div>

                    <div className="flex-1">
                        <span className="rounded-full bg-brand-light px-3 py-1 text-sm font-semibold text-brand">
                            {product.categoryIcon} {product.categoryNameBn}
                        </span>

                        <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
                            {product.nameBn}
                        </h1>

                        <p className="mt-2 text-sm text-text-muted">
                            {formatUnit(product.unit)}
                        </p>

                        <p className="mt-5 text-sm text-text-muted">আজকের দাম</p>

                        <div className="mt-1 flex flex-wrap items-center gap-3">
                            <span className="text-3xl font-extrabold text-brand">
                                {formatPrice(product.today)}
                            </span>

                            <span className={`rounded-full px-3 py-1 text-sm font-semibold ${changeColor}`}>
                                {product.change.dir === "up"
                                    ? "▲"
                                    : product.change.dir === "down"
                                        ? "▼"
                                        : "—"}{" "}
                                {formatBengaliNumber(Math.abs(product.change.pct))}%
                            </span>
                        </div>

                        <p className="mt-4 text-sm leading-7 text-text-muted">
                            গতকাল: {formatPrice(product.yesterday)} · গত সপ্তাহ:{" "}
                            {formatPrice(product.lastWeek)} · গত মাস:{" "}
                            {formatPrice(product.lastMonth)}
                        </p>
                    </div>
                </div>
            </section>

            <section className="mt-8">
                <h2 className="mb-5 text-2xl font-extrabold">
                    মূল্য সংক্ষিপ্তসার
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {[
                        { label: "সর্বনিম্ন দাম", value: minimum, color: "text-green-700" },
                        { label: "সর্বোচ্চ দাম", value: maximum, color: "text-red-600" },
                        { label: "গড় দাম", value: average, color: "text-brand" },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-2xl border border-border bg-white p-5"
                        >
                            <p className="text-sm text-text-muted">{stat.label}</p>
                            <p className={`mt-3 text-2xl font-extrabold ${stat.color}`}>
                                {formatPrice(Math.round(stat.value))}
                            </p>
                            <p className="mt-1 text-xs text-text-muted">
                                {formatUnit(product.unit)}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-10">
                <h2 className="mb-2 text-2xl font-extrabold">
                    বাজারভিত্তিক আজকের দাম
                </h2>
                <p className="mb-5 text-sm text-text-muted">
                    বিভিন্ন বাজারের সর্বনিম্ন ও সর্বোচ্চ দামের তুলনা।
                </p>

                {markets.length ? (
                    <div className="overflow-x-auto rounded-2xl border border-border bg-white">
                        <table className="w-full min-w-[540px] text-left text-sm">
                            <thead className="bg-surface-soft">
                                <tr>
                                    <th className="px-4 py-4">বাজার</th>
                                    <th className="px-4 py-4">বিভাগ</th>
                                    <th className="px-4 py-4">সর্বনিম্ন</th>
                                    <th className="px-4 py-4">সর্বোচ্চ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {markets.map((market, index) => (
                                    <tr
                                        key={`${market.market}-${market.division}-${index}`}
                                        className="border-t border-border"
                                    >
                                        <td className="px-4 py-4">{market.market}</td>
                                        <td className="px-4 py-4 text-text-muted">
                                            {market.division}
                                        </td>
                                        <td className="px-4 py-4 font-semibold text-green-700">
                                            {typeof market.min === "number"
                                                ? formatPrice(market.min)
                                                : "—"}
                                        </td>
                                        <td className="px-4 py-4 font-semibold text-red-600">
                                            {typeof market.max === "number"
                                                ? formatPrice(market.max)
                                                : "—"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="rounded-2xl border border-border bg-white p-6">
                        বাজারভিত্তিক তথ্য পাওয়া যায়নি।
                    </p>
                )}
            </section>

            <p className="mt-6 text-xs leading-6 text-text-muted">
                সকল দাম সম্ভাব্য এবং বাজারের অবস্থার ওপর নির্ভর করে পরিবর্তিত হতে পারে।
            </p>

            <Link
                href="/"
                className="mt-6 inline-flex rounded-xl border border-border bg-white px-5 py-3 font-semibold hover:border-brand hover:text-brand"
            >
                ← হোম পেজে ফিরে যান
            </Link>
        </div>
    </main>
);
}
