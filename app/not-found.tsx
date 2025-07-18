import React from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

const NotFoundPage = () => {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-md w-full space-y-10 text-center">
        <Logo />

        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Page Not Found!
          </h1>
          <p className="mt-4 text-base text-gray-600">
            Sorry, the page you're looking for doesn’t exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="w-full inline-flex justify-center items-center px-6 py-3 text-sm font-semibold text-white bg-shop_dark_green hover:bg-shop_dark_green/90 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-shop_dark_green transition duration-200"
          >
            Go to Cartify Home
          </Link>
          <Link
            href="/help"
            className="w-full inline-flex justify-center items-center px-6 py-3 text-sm font-semibold text-shop_blue border border-gray-300 bg-white hover:bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-shop_blue transition duration-200"
          >
            Visit Our Help Center
          </Link>
        </div>

        <p className="text-sm text-gray-600">
          Need more assistance? Visit our{" "}
          <Link
            href="/help"
            className="text-shop_blue hover:text-shop_blue-dark font-medium underline"
          >
            Help Center
          </Link>{" "}
          or{" "}
          <Link
            href="/contact"
            className="text-shop_blue hover:text-shop_blue-dark font-medium underline"
          >
            Contact Us
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
