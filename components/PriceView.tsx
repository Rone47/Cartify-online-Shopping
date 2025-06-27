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
  const finalPrice = Math.max(0, parseFloat(rawDiscounted.toFixed(2))); // ✅ avoid negative price
  const originalPrice = price;

  return (
    <div className="flex items-center justify-start gap-3 flex-wrap min-w-0">
      {/* ✅ Final discounted price */}
      <PriceFormatter
        amount={finalPrice}
        currency={currency}
        className={cn("text-shop_dark_green truncate text-sm sm:text-base", className)}
      />

      {/* ✅ Original price with discount badge */}
      {hasDiscount && (
        <div className="flex items-center gap-1">
          {/* 🔥 Discount Percentage Badge */}
          <span className="text-shop_orange text-xs font-semibold bg-shop_orange/10 px-2 py-0.5 rounded-full">
            -{discount.toFixed(0)}%
          </span>

          {/* 🧾 Original Price Crossed */}
          <PriceFormatter
            amount={originalPrice}
            currency={currency}
            className={twMerge(
              "line-through text-xs font-normal text-zinc-500 truncate whitespace-nowrap",
              className
            )}
          />
        </div>
      )}
    </div>
  );
};

export default PriceView;
