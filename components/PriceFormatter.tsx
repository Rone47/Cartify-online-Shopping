import { twMerge } from "tailwind-merge";

interface Props {
  amount: number | undefined;
  currency: string;
  className?: string;
}

const PriceFormatter = ({ amount, currency, className }: Props) => {
  if (!amount || !currency) return null;

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);

  return (
    <span
      className={twMerge("text-sm font-semibold text-darkColor truncate max-w-full", className)}
      title={formattedPrice}
    >
      {formattedPrice.replace("-", "")} {/* Removes negative sign if any */}
    </span>
  );
};

export default PriceFormatter;
