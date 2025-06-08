import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Logo = ({
  className,
  spanDesign,
}: {
  className?: string;
  spanDesign?: string;
}) => {
  return (
    <Link href={"/"}>
      <h2
        className={cn(
          "text-2xl text-shop_dark_green font-black tracking-wider uppercase hover:text-shop_light_green cursor-pointer hoverEffect group font-sans",
          className
        )}
      >
        Cart
        <span
          className={cn(
            "text-shop_light_green group-hover:text-shop_dark_green hoverEffect",
            spanDesign
          )}
        >
          ify
        </span>
      </h2>
    </Link>
  );
};

export default Logo;
