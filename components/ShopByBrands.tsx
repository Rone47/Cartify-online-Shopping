import React from "react";
import Title from "./Title";
import Link from "next/link";

const ShopByBrands = () => {
  return (
    <div className="mb-10 lg:pb-20 bg-shop_light_bg p-5 lg:p-7 rounded-md">
      <div className="flex items-center gap-5 justify-between mb-10">
        <Title>Shop By Brand</Title>
        <Link
          href={"/shop"}
          className="text-sm font-semibold tracking-wide hover:text-shop_btn_dark_green hoverEffect"
        >
          View all
        </Link>
      </div>
    </div>
  );
};

export default ShopByBrands;
