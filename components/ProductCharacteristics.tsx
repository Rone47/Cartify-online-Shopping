import { Product } from "@/sanity.types";
import { getBrand } from "@/sanity/queries";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const ProductCharacteristics = async ({
  product,
}: {
  product: Product | null | undefined;
}) => {
  const brand = await getBrand(product?.slug?.current as string);

  return (
    <Accordion type="single" collapsible className="w-full max-w-xl mx-auto">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-lg font-bold text-gray-800 hover:text-primary transition-colors">
          {product?.name} – Product Details
        </AccordionTrigger>
        <AccordionContent className="space-y-4 text-sm text-gray-700 px-2 py-4 bg-gray-50 rounded-lg shadow-sm">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-gray-600">Brand</span>
            <span className="font-medium text-gray-900 tracking-wide">
              {brand && brand[0]?.brandName ? brand[0].brandName : "N/A"}
            </span>
          </div>

          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-gray-600">Collection</span>
            <span className="font-medium text-gray-900 tracking-wide">
              2025
            </span>
          </div>

          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-gray-600">Type</span>
            <span className="font-medium text-gray-900 tracking-wide">
              {product?.variant || "N/A"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600">Stock Status</span>
            <span
              className={`font-semibold tracking-wide ${
                product?.stock ? "text-green-600" : "text-red-600"
              }`}
            >
              {product?.stock ? "Available" : "Out of Stock"}
            </span>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductCharacteristics;
