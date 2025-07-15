import React from "react";
import { Category } from "@/sanity.types";
import Title from "../Title";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface CategoryListProps {
  categories: Category[];
  selectedCategory?: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
  };

  const handleReset = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="w-full bg-white p-5 rounded-md shadow-sm">
      <Title className="text-base font-bold tracking-wide">Product Categories</Title>

      <RadioGroup value={selectedCategory || ""} className="mt-4 space-y-2">
        {categories?.map((category) => {
          const slug = category?.slug?.current;
          const isSelected = selectedCategory === slug;

          return (
            <div
              key={category?._id}
              onClick={() => handleCategorySelect(slug as string)}
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80"
            >
              <RadioGroupItem
                value={slug as string}
                id={slug}
                className="rounded-sm"
              />
              <Label
                htmlFor={slug}
                className={isSelected ? "font-semibold text-shop_dark_green" : "font-normal"}
              >
                {category?.title}
              </Label>
            </div>
          );
        })}
      </RadioGroup>

      {selectedCategory && (
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

export default CategoryList;
