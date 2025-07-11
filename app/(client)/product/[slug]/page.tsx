import React from "react";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

import { CornerDownLeft, StarIcon, Truck } from "lucide-react";
import QuickActions from "@/components/QuickActions";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { RxBorderSplit } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";

import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";
import FavoriteButton from "@/components/FavoriteButton";
import ImageView from "@/components/ImageView";
import ProductCharacteristics from "@/components/ProductCharacteristics";
import { getProductBySlug } from "@/sanity/queries";

interface SingleProductPageProps {
  product: Awaited<ReturnType<typeof getProductBySlug>>;
}

const SingleProductPage: React.FC<SingleProductPageProps> = ({ product }) => {
  if (!product) return notFound();

  const formatCurrency = (value: number, currency: string) => {
    try {
      return new Intl.NumberFormat("en", {
        style: "currency",
        currency,
      }).format(value);
    } catch {
      return `${currency} ${value.toFixed(2)}`;
    }
  };

  const currency = product?.currency || "USD";
  const originalPrice = product?.price || 0;
  const discount = product?.discount || 0;
  const finalPrice = originalPrice - (originalPrice * discount) / 100;

  return (
    <Container className="flex flex-col md:flex-row gap-10 py-10">
      {/* Image Section */}
      {product?.images && (
        <ImageView images={product?.images} isStock={product?.stock} />
      )}

      {/* Details Section */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        {/* Title & Description */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">{product?.name}</h2>
          <div className="text-sm text-gray-600 leading-relaxed">
            <PortableText value={product?.description} />
          </div>

          <div className="flex items-center gap-0.5 text-xs">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                size={14}
                className="text-yellow-400"
                fill="#facc15"
              />
            ))}
            <p className="ml-2 font-medium text-gray-600">(120 Reviews)</p>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="space-y-3 border-y border-gray-200 py-5">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-2xl font-bold text-black">
              {formatCurrency(finalPrice, currency)}
            </span>
            {discount > 0 && (
              <>
                <span className="text-sm text-gray-500 line-through">
                  {formatCurrency(originalPrice, currency)}
                </span>
                <span className="text-sm font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                  -{discount}%
                </span>
              </>
            )}
          </div>
          <p
            className={`px-4 py-1.5 text-sm text-center inline-block font-medium rounded-full w-fit ${
              product?.stock === 0
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-700"
            }`}
          >
            {(product?.stock as number) > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <AddToCartButton product={product} />
          <FavoriteButton showProduct={true} product={product} />
        </div>

        {/* Product Characteristics */}
        <ProductCharacteristics product={product} />

        {/* Helpful Links */}
        {/* Helpful Links */}
        <div className="grid grid-cols-2 sm:flex items-center justify-between gap-4 border-b border-gray-200 py-5">
          {[
            {
              icon: <FaRegQuestionCircle size={20} className="text-gray-500" />,
              label: "Help",
              href: "#",
            },
            {
              icon: <FiShare2 size={20} className="text-gray-500" />,
              label: "Share",
              href: "#",
            },
            {
              icon: <RxBorderSplit size={20} className="text-gray-500" />,
              label: "Compare",
              href: "#",
            },
            {
              icon: <TbTruckDelivery size={20} className="text-gray-500" />,
              label: "Shipping",
              href: "#",
            },
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-shop_orange transition"
            >
              {item.icon}
              {item.label}
            </a>
          ))}
        </div>

        {/* Delivery Information */}
        <div className="flex flex-col mt-2 rounded-lg overflow-hidden border border-gray-200 shadow-sm divide-y divide-gray-200">
          <div className="flex items-start gap-3 p-4 bg-gray-50">
            <Truck size={26} className="text-shop_orange" />
            <div>
              <p className="text-base font-semibold text-gray-800">
                Free Delivery
              </p>
              <p className="text-sm text-gray-500 underline underline-offset-2">
                Enter your Postal code for Delivery Availability
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4">
            <CornerDownLeft size={26} className="text-shop_orange" />
            <div>
              <p className="text-base font-semibold text-gray-800">
                Return Delivery
              </p>
              <p className="text-sm text-gray-500">
                Free 30-day Delivery Returns.{" "}
                <span className="underline underline-offset-2">Details</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

// Server Component Wrapper
const Page = async ({ params }: { params: { slug: string } }) => {
  const product = await getProductBySlug(params.slug);
  if (!product) return notFound();
  return <SingleProductPage product={product} />;
};

export default Page;
