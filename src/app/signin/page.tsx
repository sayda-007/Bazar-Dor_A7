
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SigninPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState<
        "google" | "github" | null
    >(null);

    async function handleSignin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!email.trim() || !password) {
            toast.error("ইমেইল ও পাসওয়ার্ড পূরণ করুন।");
            return;
        }

        setLoading(true);

        try {
            const result = await authClient.signIn.email({
                email: email.trim(),
                password,
            });

            if (result.error) {
                toast.error(
                    result.error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।"
                );
                return;
            }

            toast.success("সফলভাবে সাইন ইন হয়েছে!");
            router.push("/");
            router.refresh();
        } catch {
            toast.error("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    }

    async function handleSocialSignin(provider: "google" | "github") {
        setSocialLoading(provider);

        try {
            const result = await authClient.signIn.social({
                provider,
                callbackURL: "/",
            });

            if (result.error) {
                toast.error(
                    result.error.message ||
                    `${provider} দিয়ে সাইন ইন করা যায়নি।`
                );
            }
        } catch {
            toast.error(
                `${provider} লগইন চালু নেই অথবা সংযোগে সমস্যা হয়েছে।`
            );
        } finally {
            setSocialLoading(null);
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
                        স্বাগতম!
                    </h1>

                    <p className="mt-2 text-sm text-text-muted">
                        আপনার বাজার দর অ্যাকাউন্টে সাইন ইন করুন।
                    </p>
                </div>

                <form onSubmit={handleSignin} className="space-y-4">
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
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="আপনার পাসওয়ার্ড"
                            className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || socialLoading !== null}
                        className="w-full rounded-xl bg-brand px-4 py-3 font-bold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন করুন"}
                    </button>
                </form>

                <div className="my-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-xs text-text-muted">
                        অথবা সাইন ইন করুন
                    </span>
                    <div className="h-px flex-1 bg-border" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        disabled={loading || socialLoading !== null}
                        onClick={() => handleSocialSignin("google")}
                        className="rounded-xl border border-border px-3 py-3 text-sm font-semibold transition hover:bg-surface-soft disabled:opacity-60"
                    >
                        {socialLoading === "google" ? "অপেক্ষা করুন..." : "Google"}
                    </button>

                    <button
                        type="button"
                        disabled={loading || socialLoading !== null}
                        onClick={() => handleSocialSignin("github")}
                        className="rounded-xl border border-border px-3 py-3 text-sm font-semibold transition hover:bg-surface-soft disabled:opacity-60"
                    >
                        {socialLoading === "github" ? "অপেক্ষা করুন..." : "GitHub"}
                    </button>
                </div>

                <p className="mt-6 text-center text-sm text-text-muted">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link
                        href="/signup"
                        className="font-bold text-brand hover:underline"
                    >
                        সাইন আপ করুন
                    </Link>
                </p>
            </section>
        </main>
    );
}
