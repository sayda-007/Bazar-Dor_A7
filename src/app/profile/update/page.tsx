
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateProfileForm from "./UpdateProfileForm";

export const instant = false;

export default async function UpdateProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect(
            "/signin?reason=auth-required&callbackURL=%2Fprofile%2Fupdate"
        );
    }

    return (
        <main className="mx-auto max-w-2xl px-4 py-10">
            <Link
                href="/profile"
                className="mb-6 inline-block text-sm text-green-700 hover:underline"
            >
                ← Back to Profile
            </Link>

            <h1 className="mb-2 text-3xl font-bold">
                Update Profile
            </h1>

            <p className="mb-8 text-gray-600">
                Update your name and profile photo.
            </p>

            <UpdateProfileForm
                initialName={session.user.name ?? ""}
                initialImage={session.user.image ?? ""}
            />
        </main>
    );
}
