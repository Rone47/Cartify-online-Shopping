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

  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {categories?.map((category) => (
      <Link
        key={category._id}
        href={`/category/${category?.slug?.current}`}
        className="bg-shop_light_bg p-5 rounded-xl flex items-center gap-4 hover:shadow-md transition-shadow group"
      >
        {category?.image && (
          <div className="flex-shrink-0 w-20 h-20 overflow-hidden border border-shop_orange/30 rounded-lg group-hover:border-shop_orange transition-all">
            <Image
              src={urlFor(category?.image).url()}
              alt={category?.title || 'Category'}
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
          <p className="text-sm text-gray-500 mt-1">
            <span className="font-semibold text-shop_dark_green">
              {`(${category?.productCount})`}
            </span>{' '}
            items available
          </p>
        </div>
      </Link>
    ))}
  </div>
</div>

  );
};

export default HomeCategories;
