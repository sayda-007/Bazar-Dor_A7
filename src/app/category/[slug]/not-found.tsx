import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <main className="flex min-h-[55vh] flex-col items-center justify-center px-4 text-center">
      <span className="text-6xl" aria-hidden="true">
        🧺
      </span>

      <h1 className="mt-5 text-3xl font-extrabold text-foreground">
        ক্যাটাগরি পাওয়া যায়নি!
      </h1>

      <p className="mt-3 max-w-md text-text-muted">
        আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি নেই অথবা ঠিকানা ভুল হয়েছে।
      </p>

      <Link
        href="/"
        className="mt-6 rounded-xl bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-dark"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}