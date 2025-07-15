import React from "react";
import Title from "../Title";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface PriceRange {
  title: string;
  value: string;
  min: number;
  max: number;
}

const priceRanges: PriceRange[] = [
  { title: "Under", value: "0-100", min: 0, max: 100 },
  { title: "Between", value: "100-200", min: 100, max: 200 },
  { title: "Between", value: "200-300", min: 200, max: 300 },
  { title: "Between", value: "300-500", min: 300, max: 500 },
  { title: "Over", value: "500-10000", min: 500, max: 10000 },
];

interface Props {
  selectedPrice?: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
  currencySymbol: string; // e.g. "$", "€", "Ksh", "₹"
}

const PriceList: React.FC<Props> = ({ selectedPrice, setSelectedPrice, currencySymbol }) => {
  const formatPriceLabel = (range: PriceRange): string => {
    const { min, max, title } = range;
    if (title === "Under") return `Under ${currencySymbol}${max}`;
    if (title === "Over") return `Over ${currencySymbol}${min}`;
    return `${currencySymbol}${min} - ${currencySymbol}${max}`;
  };

  const handleReset = () => {
    setSelectedPrice(null);
  };

  return (
    <div className="w-full bg-white p-5 rounded-md shadow-sm">
      <Title className="text-base font-bold tracking-wide">Price Range</Title>
      <RadioGroup value={selectedPrice || ""} className="mt-4 space-y-2">
        {priceRanges.map((range) => (
          <div
            key={range.value}
            onClick={() => setSelectedPrice(range.value)}
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80"
          >
            <RadioGroupItem
              value={range.value}
              id={range.value}
              className="rounded-sm"
            />
            <Label
              htmlFor={range.value}
              className={
                selectedPrice === range.value
                  ? "font-semibold text-shop_dark_green"
                  : "font-normal"
              }
            >
              {formatPriceLabel(range)}
            </Label>
          </div>
        ))}
      </RadioGroup>

      {selectedPrice && (
        <button
          type="button"
          onClick={handleReset}
          className="text-sm font-medium mt-3 underline underline-offset-2 decoration-[1px] hover:text-shop_dark_green hoverEffect text-left"
        >
          Reset selection
        </button>
      )}
    </div>
  );
};

export default PriceList;
