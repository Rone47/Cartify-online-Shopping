import React from "react";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";

const Footer = () => {
  return (
    <footer className="bg-white border-t w-full ">
      <FooterTop />
      <div className=" pl-10 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p>
            Your ultimate online shopping destination, offering a seamless and
            secure experience with a wide range of quality products. From
            electronics to fashion, home essentials to beauty products, Cartify
            combines convenience, affordability, and fast delivery—all in one
            place. Shop smarter, live better with Cartify.
          </p>
          <SocialMedia
            className="text-darkColor/60"
            iconClassName="border-darkColor/60 hover:border-shop_light_green hover:text-shop_dark_green"
            tooltipClassName="bg-darkColor text-white"
          />
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </footer>
  );
};

export default Footer;
