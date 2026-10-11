
import type { Category, Product } from "./types";

export const API_BASE_URL =
  "https://openapi.programming-hero.com/api/bazardor";

function extractArray<T>(payload: unknown, endpoint: string): T[] {
    if (Array.isArray(payload)) {
        return payload as T[];
    }

    if (typeof payload !== "object" || payload === null) {
        throw new Error(`Invalid API response from ${endpoint}.`);
    }

    const record = payload as Record<string, unknown>;
    const collectionKeys = [
        "value",
        "products",
        "Products",
        "categories",
        "Categories",
        "data",
        "items",
        "results",
    ];

    for (const key of collectionKeys) {
        if (Array.isArray(record[key])) {
            return record[key] as T[];
        }
    }

    // Also support a nested collection, such as { data: { products: [...] } }.
    for (const key of ["data", "result"]) {
        const nested = record[key];

        if (typeof nested === "object" && nested !== null) {
            const nestedRecord = nested as Record<string, unknown>;

            for (const collectionKey of collectionKeys) {
                if (Array.isArray(nestedRecord[collectionKey])) {
                    return nestedRecord[collectionKey] as T[];
                }
            }
        }
    }

    throw new Error(
        `Invalid API response from ${endpoint}. ` +
        `Top-level keys: ${Object.keys(record).join(", ")}`
    );
}

async function fetchCollection<T>(endpoint: string): Promise<T[]> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    next: { revalidate: 60 },
});

    if (!response.ok) {
        throw new Error(
            `API request failed: ${response.status} ${response.statusText}`
        );
    }

    const payload: unknown = await response.json();

    return extractArray<T>(payload, endpoint);
}

export async function getProducts(category?: string): Promise<Product[]> {
    const endpoint = category
        ? `/products?category=${encodeURIComponent(category)}`
        : "/products";

    return fetchCollection<Product>(endpoint);
}

export async function getCategories(): Promise<Category[]> {
    return fetchCollection<Category>("/categories");
}
