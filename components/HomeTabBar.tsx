"use client";
import { useState } from "react";
import { productType } from "@/constants/data";
import Link from "next/link";

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabbar = ({ selectedTab, onTabSelect }: Props) => {
  const [showAll, setShowAll] = useState(false);
  const visibleLimit = 4;

  const visibleTabs = showAll ? productType : productType.slice(0, visibleLimit);
  const hasExtraTabs = productType.length > visibleLimit;

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-5 w-full">
      <div className="flex flex-wrap gap-2 md:gap-3">
        {visibleTabs.map((item) => (
          <button
            key={item.title}
            onClick={() => onTabSelect(item.title)}
            className={`whitespace-nowrap px-4 md:px-6 py-1.5 md:py-2 rounded-full border text-sm font-semibold transition-all duration-200
              ${selectedTab === item.title
                ? "bg-shop_light_green text-white border-shop_light_green"
                : "bg-shop_light_green/10 text-black border-shop_light_green/30 hover:bg-shop_light_green hover:text-white hover:border-shop_light_green"
              }`}
          >
            {item.title}
          </button>
        ))}

        {hasExtraTabs && (
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="px-4 md:px-6 py-1.5 md:py-2 rounded-full border border-gray-300 text-sm font-semibold hover:bg-gray-200 transition"
          >
            {showAll ? "Show Less" : "More..."}
          </button>
        )}
      </div>

      <Link
        href="/shop"
        className="mt-2 md:mt-0 px-4 py-1.5 md:px-6 md:py-2 rounded-full border border-darkColor text-sm font-semibold hover:bg-shop_light_green hover:text-white hover:border-shop_light_green transition"
      >
        See All
      </Link>
    </div>
  );
};

export default HomeTabbar;

