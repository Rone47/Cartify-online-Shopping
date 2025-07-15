import React from "react";
import { BRANDS_QUERYResult } from "@/sanity.types";
import Title from "../Title";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface BrandListProps {
  brands: BRANDS_QUERYResult;
  selectedBrand?: string | null;
  setSelectedBrand: React.Dispatch<React.SetStateAction<string | null>>;
}

const BrandList: React.FC<BrandListProps> = ({ brands, selectedBrand, setSelectedBrand }) => {
  const handleBrandSelection = (slug: string) => {
    setSelectedBrand(slug);
  };

  const handleResetSelection = () => {
    setSelectedBrand(null);
  };

  return (
    <div className="w-full bg-white p-5 rounded-md shadow-sm">
      <Title className="text-base font-bold tracking-wide">Filter by Brand</Title>
      <RadioGroup value={selectedBrand || ""} className="mt-4 space-y-2">
        {brands?.map((brand) => {
          const brandSlug = brand?.slug?.current;
          const isSelected = selectedBrand === brandSlug;

          return (
            <div
              key={brand?._id}
              onClick={() => handleBrandSelection(brandSlug as string)}
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80"
            >
              <RadioGroupItem
                value={brandSlug as string}
                id={brandSlug}
                className="rounded-sm"
              />
              <Label
                htmlFor={brandSlug}
                className={isSelected ? "font-semibold text-shop_dark_green" : "font-normal"}
              >
                {brand?.title}
              </Label>
            </div>
          );
        })}
        {selectedBrand && (
          <button
            type="button"
            onClick={handleResetSelection}
            className="text-sm font-medium mt-3 underline underline-offset-2 decoration-[1px] hover:text-shop_dark_green hoverEffect text-left"
          >
            Reset selection
          </button>
        )}
      </RadioGroup>
    </div>
  );
};

export default BrandList;
