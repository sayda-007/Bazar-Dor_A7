
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type Props = {
    initialName: string;
    initialImage: string;
};

export default function UpdateProfileForm({
    initialName,
    initialImage,
}: Props) {
    const router = useRouter();

    const [name, setName] = useState(initialName);
    const [image, setImage] = useState(initialImage);
    const [isSaving, setIsSaving] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmedName = name.trim();

        if (trimmedName.length < 2) {
            toast.error("Name must contain at least 2 characters.");
            return;
        }

        setIsSaving(true);

        try {
            const { error } = await authClient.updateUser({
                name: trimmedName,
                image: image.trim() || null,
            });

            if (error) {
                toast.error(error.message || "Failed to update profile.");
                return;
            }

            toast.success("Profile updated successfully!");
            router.push("/profile");
            router.refresh();
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
            <div>
                <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Full Name
                </label>

                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    minLength={2}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                />
            </div>

            <div>
                <label
                    htmlFor="image"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Profile Photo URL (optional)
                </label>

                <input
                    id="image"
                    type="url"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                />

                <p className="mt-2 text-xs text-gray-500">
                    Leave blank to remove your current profile photo.
                </p>
            </div>

            <button
                type="submit"
                disabled={isSaving}
                className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSaving ? "Saving..." : "Save Changes"}
            </button>
        </form>
    );
}
