import React from "react";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { SubText, SubTitle } from "./ui/text";
import { categoriesData, quickLinksData } from "@/constants/data";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-white border-t w-full">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b">
        <FooterTop />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand & About */}
        <div className="space-y-4">
          <Logo />
          <SubText>
            Your ultimate online shopping destination, offering a seamless and secure experience
            with a wide range of quality products. From electronics to fashion, home essentials
            to beauty, Cartify combines convenience, affordability, and fast delivery all in one place.
          </SubText>
          <SocialMedia
            className="text-darkColor/60"
            iconClassName="border-darkColor/60 hover:border-shop_light_green hover:text-shop_dark_green"
            tooltipClassName="bg-darkColor text-white"
          />
        </div>

        {/* Quick Links */}
        <div>
          <SubTitle>Quick Links</SubTitle>
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            {quickLinksData?.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="hover:underline hover:text-shop_dark_green transition duration-200 font-medium"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <SubTitle>Categories</SubTitle>
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            {categoriesData?.map((item) => (
              <li key={item.title}>
                <Link
                  href={`/category/${item.href}`}
                  className="hover:underline hover:text-shop_dark_green transition duration-200 font-medium"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <SubTitle>Newsletter</SubTitle>
          <SubText>Subscribe to receive updates and exclusive offers.</SubText>
          <form className="space-y-3">
            <Input placeholder="Enter your email" />
            <Button className="w-full">Subscribe</Button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
