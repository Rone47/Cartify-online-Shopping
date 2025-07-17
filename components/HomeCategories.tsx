import React from "react";
import Title from "./Title";
import { Category } from "@/sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

const HomeCategories = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="bg-white border border-shop_light_green/30 shadow-sm my-10 md:my-20 p-6 lg:p-10 rounded-2xl">
      <Title className="text-xl lg:text-2xl font-bold border-b border-gray-200 pb-4 text-shop_dark_green">
        Popular Categories
      </Title>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories?.map((category) => (
          <Link
            key={category._id}
            href={{ pathname: "/shop", query: { brand: category?.slug?.current } }}
            className="bg-shop_light_bg p-5 rounded-xl flex items-center gap-4 hover:shadow-md transition-shadow group"
          >
            {category?.image && (
              <div className="flex-shrink-0 w-20 h-20 overflow-hidden bg-gray-50 rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <Image
                  src={urlFor(category?.image).url()}
                  alt={category?.title || "Category"}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            )}

            <div className="flex flex-col justify-center">
              <h3 className="text-lg font-medium text-gray-800 group-hover:text-shop_orange transition-colors">
                {category?.title}
              </h3>

              {category?.productCount !== undefined && (
                <p className="text-sm text-gray-500 mt-1">
                  <span className="font-semibold text-shop_dark_green">
                    {category.productCount}
                  </span>{" "}
                  {category.productCount === 1
                    ? "item available"
                    : "products in stock"}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
