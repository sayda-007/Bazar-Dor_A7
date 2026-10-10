import type {
    ApiListResponse,
    Category,
    Product,
} from "./types";

export const API_BASE_URL =
    "https://api.abcz.workers.dev/api/bazardor";

async function fetchList<T>(
    endpoint: string
): Promise<ApiListResponse<T>> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(
            `API request failed: ${response.status} ${response.statusText}`
        );
    }

    const data: unknown = await response.json();

    if (
        typeof data !== "object" ||
        data === null ||
        !("value" in data) ||
        !Array.isArray(data.value)
    ) {
        throw new Error("Invalid API response: expected a value array.");
    }

    return data as ApiListResponse<T>;
}

export async function getProducts(
    category?: string
): Promise<Product[]> {
    const endpoint = category
        ? `/products?category=${encodeURIComponent(category)}`
        : "/products";

    const response = await fetchList<Product>(endpoint);

    return response.value;
}

export async function getCategories(): Promise<Category[]> {
    const response = await fetchList<Category>("/categories");

    return response.value;
}