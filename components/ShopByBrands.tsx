import React from "react";
import Title from "./Title";
import Link from "next/link";
import { getAllBrands } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import {
  GitCompareArrows,
  Headset,
  ShieldCheck,
  Truck,
} from "lucide-react";

// Professional and scalable value propositions
const extraData = [
  {
    title: "Flexible Shipping Options",
    description: "Enjoy fast & reliable delivery free on orders above $100.",
    icon: <Truck size={45} />,
  },
  {
    title: "Easy Returns & Exchanges",
    description: "Hassle-free 30-day return policy for your peace of mind.",
    icon: <GitCompareArrows size={45} />,
  },
  {
    title: "24/7 Expert Support",
    description: "Dedicated customer care available any time, any day.",
    icon: <Headset size={45} />,
  },
  {
    title: "Secure Purchases",
    description: "Authentic products with 100% money-back guarantee.",
    icon: <ShieldCheck size={45} />,
  },
];

const ShopByBrands = async () => {
  const brands = await getAllBrands();

  return (
    <div className="mb-10 lg:mb-20 bg-shop_light_bg p-5 lg:p-7 rounded-md">
      {/* Top Section: Title and Link */}
      <div className="flex items-center justify-between mb-10 gap-5">
        <Title>Shop by Brands</Title>
        <Link
          href="/shop"
          className="text-sm font-semibold tracking-wide hover:text-shop_btn_dark_green hoverEffect"
        >
          View All
        </Link>
      </div>

      {/* Brand Logos Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {brands?.map((brand) => (
          <Link
            key={brand?._id}
            href={{ pathname: "/shop", query: { brand: brand?.slug?.current } }}
            className="bg-white w-34 h-24 flex items-center justify-center rounded-md overflow-hidden hover:shadow-lg shadow-shop_dark_green/20 hoverEffect"
          >
            {brand?.image && (
              <Image
                src={urlFor(brand?.image).url()}
                alt={`${brand?.name || "Brand"} Logo`}
                width={250}
                height={250}
                className="w-32 h-20 object-contain"
              />
            )}
          </Link>
        ))}
      </div>

      {/* Service Benefits Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 p-2 py-5 shadow-sm hover:shadow-shop_light_green/20">
        {extraData.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 group text-lightColor hover:text-shop_light_green transition-all"
          >
            <span className="inline-flex scale-100 group-hover:scale-95 hoverEffect">
              {item.icon}
            </span>
            <div className="text-sm">
              <p className="text-darkColor/90 font-bold capitalize">
                {item.title}
              </p>
              <p className="text-lightColor leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByBrands;
