
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const instant = false;

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?reason=auth-required&callbackURL=%2Fprofile");
  }

  const user = session.user;

  return (
    <main className="min-h-[70vh] px-4 py-12 sm:px-6">
      <section className="mx-auto max-w-2xl">
        <nav className="mb-6 text-sm text-text-muted">
          <Link href="/" className="hover:text-brand">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>My Profile</span>
        </nav>

        <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
          <div className="bg-brand-light px-6 py-8 sm:px-8">
            <div className="flex items-center gap-4">
              {user.image ? (
                <img
                  src={user.image}
                  alt=""
                  className="h-16 w-16 rounded-full border-2 border-white object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-extrabold text-brand">
                  {(user.name || user.email).charAt(0).toUpperCase()}
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-brand">
                  Bazar Dor Account
                </p>
                <h1 className="mt-1 text-2xl font-extrabold text-foreground sm:text-3xl">
                  My Profile
                </h1>
              </div>
            </div>
          </div>

          <div className="space-y-5 p-6 sm:p-8">
            <div>
              <p className="text-sm text-text-muted">Full name</p>
              <p className="mt-1 break-words font-semibold text-foreground">
                {user.name || "Name not provided"}
              </p>
            </div>

            <div className="border-t border-border pt-5">
              <p className="text-sm text-text-muted">Email address</p>
              <p className="mt-1 break-words font-semibold text-foreground">
                {user.email}
              </p>
            </div>

            <div className="border-t border-border pt-5">
              <p className="text-sm text-text-muted">Email verification</p>
              <p className="mt-1 font-semibold text-foreground">
                {user.emailVerified ? "Verified" : "Not verified"}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 border-t border-border pt-6">
              <Link
                href="/profile/update"
                className="rounded-xl bg-brand px-5 py-3 font-semibold text-white transition hover:bg-brand-dark"
              >
                Update Information
              </Link>

              <Link
                href="/"
                className="rounded-xl border border-border px-5 py-3 font-semibold text-foreground transition hover:border-brand hover:text-brand"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
