
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const categoryLinks = [
  { label: "সব পণ্য", href: "/#all-products", activePath: "/" },
  { label: "চাল", href: "/category/chal", activePath: "/category/chal" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [banglaDate, setBanglaDate] = useState("");
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("bn-BD", {
      dateStyle: "full",
      timeZone: "Asia/Dhaka",
    });

    setBanglaDate(formatter.format(new Date()));
  }, []);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

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
            alt=""
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
          {!isPending && session ? (
            <>
              <span className="hidden max-w-36 truncate text-sm font-medium sm:inline">
                Hi, {session.user.name || session.user.email}
              </span>

              <Link
                href="/profile"
                className="rounded-lg border border-border px-3 py-2 text-sm font-semibold hover:border-brand hover:text-brand"
              >
                My Profile
              </Link>

              <button
                type="button"
                onClick={() => void handleSignOut()}
                className="rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
              >
                Sign Out
              </button>
            </>
          ) : !isPending ? (
            <>
              <Link
                href="/signin"
                className="rounded-lg border border-border px-3 py-2 text-sm font-semibold hover:border-brand hover:text-brand"
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
              >
                সাইন আপ
              </Link>
            </>
          ) : null}
        </div>
      </div>

      <nav
        aria-label="পণ্যের ক্যাটাগরি"
        className="border-t border-border/70"
      >
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2 sm:justify-center">
          {categoryLinks.map((category) => {
            const active =
              category.activePath === "/"
                ? pathname === "/"
                : pathname === category.activePath ||
                  pathname.startsWith(`${category.activePath}/`);

            return (
              <Link
                key={category.href}
                href={category.href}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${
                  active
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
