import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import PriceFormatter from "./PriceFormatter";

interface Props {
  price: number | undefined;
  discount: number | undefined;
  currency: string;
  className?: string;
}

const PriceView = ({ price, discount, currency, className }: Props) => {
  if (price === undefined || currency === undefined) return null;

  const hasDiscount = typeof discount === "number" && discount > 0 && discount < 100;

  const rawDiscounted = hasDiscount ? price - (discount * price) / 100 : price;
  const finalPrice = Math.max(0, parseFloat(rawDiscounted.toFixed(2))); // Avoid negative

  const originalPrice = price;

  return (
    <div className="flex flex-col items-start min-w-0 gap-0.5">
      {/* Original price with discount badge (always on top if discounted) */}
      {hasDiscount && (
        <div className="flex items-center gap-1">
          <PriceFormatter
            amount={originalPrice}
            currency={currency}
            className={twMerge(
              "line-through text-xs font-normal text-zinc-500 truncate whitespace-nowrap",
              className
            )}
          />
          <span className="text-shop_orange text-xs font-semibold bg-shop_orange/10 px-2 py-0.5 rounded-full">
            -{discount.toFixed(0)}%
          </span>
        </div>
      )}

      {/* Final discounted price (always below) */}
      <PriceFormatter
        amount={finalPrice}
        currency={currency}
        className={cn("text-shop_dark_green truncate text-sm sm:text-base", className)}
      />
    </div>
  );
};

export default PriceView;
