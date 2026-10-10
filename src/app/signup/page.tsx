
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSignup(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!name.trim() || !email.trim() || !password) {
            toast.error("সব তথ্য পূরণ করুন।");
            return;
        }

        if (password.length < 8) {
            toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
            return;
        }

        setLoading(true);

        try {
            const result = await authClient.signUp.email({
                name: name.trim(),
                email: email.trim(),
                password,
            });

            if (result.error) {
                toast.error(
                    result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।"
                );
                return;
            }

            toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন।");
            router.push("/signin");
        } catch {
            toast.error("রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    }

    async function handleSocialSignup(provider: "google" | "github") {
        try {
            const result = await authClient.signIn.social({
                provider,
                callbackURL: "/",
            });

            if (result.error) {
                toast.error(
                    result.error.message ||
                    `${provider} দিয়ে সাইন আপ করা যায়নি।`
                );
            }
        } catch {
            toast.error(
                `${provider} login চালু নেই অথবা সংযোগে সমস্যা হয়েছে।`
            );
        }
    }

    return (
        <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
            <section className="w-full max-w-md rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-7 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-light text-3xl">
                        🛒
                    </div>

                    <h1 className="mt-4 text-3xl font-extrabold text-foreground">
                        অ্যাকাউন্ট তৈরি করুন
                    </h1>

                    <p className="mt-2 text-sm text-text-muted">
                        বাজার দর-এর সঙ্গে যুক্ত হোন
                    </p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-2 block text-sm font-semibold"
                        >
                            আপনার নাম
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="আপনার পূর্ণ নাম"
                            className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-semibold"
                        >
                            ইমেইল
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="name@example.com"
                            className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-semibold"
                        >
                            পাসওয়ার্ড
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            minLength={8}
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-brand px-4 py-3 font-bold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ করুন"}
                    </button>
                </form>

                <div className="my-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-xs text-text-muted">অথবা সাইন আপ করুন</span>
                    <div className="h-px flex-1 bg-border" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => handleSocialSignup("google")}
                        className="rounded-xl border border-border px-3 py-3 text-sm font-semibold transition hover:bg-surface-soft"
                    >
                        Google
                    </button>

                    <button
                        type="button"
                        onClick={() => handleSocialSignup("github")}
                        className="rounded-xl border border-border px-3 py-3 text-sm font-semibold transition hover:bg-surface-soft"
                    >
                        GitHub
                    </button>
                </div>

                <p className="mt-6 text-center text-sm text-text-muted">
                    ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
                    <Link
                        href="/signin"
                        className="font-bold text-brand hover:underline"
                    >
                        সাইন ইন করুন
                    </Link>
                </p>
            </section>
        </main>
    );
}
