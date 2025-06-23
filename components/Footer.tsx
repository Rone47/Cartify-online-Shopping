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
    <footer className="bg-white border-t w-full ">
      <FooterTop />
      <div className=" pl-10 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <SubText>
            Your ultimate online shopping destination, offering a seamless and
            secure experience with a wide range of quality products. From
            electronics to fashion, home essentials to beauty products, Cartify
            combines convenience, affordability, and fast delivery—all in one
            place. Shop smarter, live better with Cartify.
          </SubText>
          <SocialMedia
            className="text-darkColor/60"
            iconClassName="border-darkColor/60 hover:border-shop_light_green hover:text-shop_dark_green"
            tooltipClassName="bg-darkColor text-white"
          />
        </div>

        <div>
          <SubTitle>Quick Links</SubTitle>
          <ul className="space-y-2 mt-4 text-sm text-gray-700">
            {quickLinksData?.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="hover:underline hover:text-shop_dark_green transition-colors duration-200 hoverEffect font-medium"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SubTitle>Categories</SubTitle>
          <ul className="space-y-2 mt-4 text-sm text-gray-700">
            {categoriesData?.map((item) => (
              <li key={item.title}>
                <Link
                  href={`/category/${item.href}`}
                  className="hover:underline hover:text-shop_dark_green transition-colors duration-200 hoverEffect font-medium"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 ">
          <SubTitle>News Letter</SubTitle>
          <SubText>
            Subscribe to our newsletter to receive updates and exclusive offers
          </SubText>
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
