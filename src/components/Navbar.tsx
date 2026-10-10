"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const categoryLinks = [
    { label: "সব পণ্য", href: "/#all-products", slug: "" },
    { label: "চাল", href: "/category/chal", slug: "chal" },
    { label: "ডাল", href: "/category/dal", slug: "dal" },
    { label: "তেল", href: "/category/tel", slug: "tel" },
    { label: "সবজি", href: "/category/sobji", slug: "sobji" },
    { label: "মাছ", href: "/category/mach", slug: "mach" },
    { label: "মাংস", href: "/category/mangsho", slug: "mangsho" },
    { label: "ডিম-দুধ", href: "/category/dim-dui", slug: "dim-dui" },
    { label: "মসলা", href: "/category/mosla", slug: "mosla" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [banglaDate, setBanglaDate] = useState("");

    useEffect(() => {
        setBanglaDate(
            new Intl.DateTimeFormat("bn-BD", {
                dateStyle: "full",
                timeZone: "Asia/Dhaka",
            }).format(new Date())
        );
    }, []);

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
                <Link
                    href="/"
                    aria-label="বাজার দর হোম পেজ"
                    className="flex min-w-0 items-center gap-3"
                >
                    <Image
                        src="/logo-icon.png"
                        alt="বাজার দর"
                        width={46}
                        height={46}
                        priority
                        className="shrink-0 object-contain"
                    />

                    <div>
                        <span className="block text-xl font-extrabold text-brand sm:text-2xl">
                            বাজার দর
                        </span>
                        <span className="block text-xs text-text-muted">
                            {banglaDate}
                        </span>
                    </div>
                </Link>

                <div className="flex shrink-0 items-center gap-2">
                    <Link
                        href="/signin"
                        className="rounded-lg border border-border px-3 py-2 text-sm font-semibold hover:border-brand hover:text-brand sm:px-4"
                    >
                        সাইন ইন
                    </Link>

                    <Link
                        href="/signup"
                        className="rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-dark sm:px-4"
                    >
                        সাইন আপ
                    </Link>
                </div>
            </div>

            <nav
                aria-label="পণ্যের ক্যাটাগরি"
                className="border-t border-border/70"
            >
                <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2 sm:px-6">
                    {categoryLinks.map((category) => {
                        const active = category.slug
                            ? pathname === `/category/${category.slug}`
                            : pathname === "/";

                        return (
                            <Link
                                key={category.href}
                                href={category.href}
                                aria-current={active ? "page" : undefined}
                                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${active
                                        ? "bg-brand text-white"
                                        : "text-text-muted hover:bg-brand-light hover:text-brand"
                                    }`}
                            >
                                {category.label}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </header>
    );
}