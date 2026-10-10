
import { getProducts } from "@/lib/api";
import {
    formatBengaliNumber,
    formatPriceChange,
} from "@/lib/format";

export default async function PriceTicker() {
    let products;

    try {
        products = await getProducts();
    } catch (error) {
        console.error("Failed to load ticker products:", error);
        return null;
    }

    if (products.length === 0) {
        return null;
    }

    // Duplicate the products for a continuous scrolling effect.
    const tickerProducts = [...products, ...products];

    return (
        <section
            className="price-ticker"
            aria-label="আজকের বাজারদর"
        >
            <div className="price-ticker__inner">
                <div className="price-ticker__label">
                    <span aria-hidden="true">●</span>
                    <span>বাজার দর</span>
                </div>

                <div className="price-ticker__viewport">
                    <div className="price-ticker__track">
                        {tickerProducts.map((product, index) => {
                            const direction = product.change.dir;

                            const changeColor =
                                direction === "up"
                                    ? "text-red-600"
                                    : direction === "down"
                                        ? "text-green-700"
                                        : "text-gray-500";

                            return (
                                <div
                                    className="price-ticker__item"
                                    key={`${product.id}-${index}`}
                                >
                                    <span aria-hidden="true">
                                        {product.image || "🛒"}
                                    </span>

                                    <span className="font-medium">
                                        {product.nameBn}
                                    </span>

                                    <strong className="text-brand">
                                        ৳{formatBengaliNumber(product.today)}
                                    </strong>

                                    <span className={`text-xs font-semibold ${changeColor}`}>
                                        {formatPriceChange(
                                            direction,
                                            product.change.pct
                                        )}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
