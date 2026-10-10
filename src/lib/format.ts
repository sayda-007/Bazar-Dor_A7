
export function formatBengaliNumber(value: number): string {
    return new Intl.NumberFormat("bn-BD", {
        maximumFractionDigits: 2,
    }).format(value);
}

export function formatPrice(value: number): string {
    return `${formatBengaliNumber(value)} টাকা`;
}

export function formatUnit(unit: string): string {
    const units: Record<string, string> = {
        kg: "প্রতি কেজি",
        litre: "প্রতি লিটার",
        liter: "প্রতি লিটার",
        dozen: "প্রতি ডজন",
        piece: "প্রতি পিস",
    };

    return units[unit.toLowerCase()] ?? `প্রতি ${unit}`;
}

export function formatPriceChange(
    direction: "up" | "down" | "flat",
    percentage: number
): string {
    if (direction === "flat") {
        return "— ০.০%";
    }

    const arrow = direction === "up" ? "▲" : "▼";
    const percentageText = formatBengaliNumber(Math.abs(percentage));

    return `${arrow} ${percentageText}%`;
}
