"use client";
import useStore from "@/store";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";
import clsx from "clsx";

const CartIcon = () => {
  const { items } = useStore();
  const hasItems = items?.length > 0;

  return (
    <Link href={"/cart"} className="group relative flex items-center gap-1">
      <ShoppingBag className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
      {hasItems && (
        <>
          <span
            className={clsx(
              "absolute -top-1 -right-1 text-white h-4 w-4 rounded-full text-[10px] font-semibold flex items-center justify-center",
              "bg-orange-700"
            )}
          >
            {items.length}
          </span>
        </>
      )}
    </Link>
  );
};

export default CartIcon;
