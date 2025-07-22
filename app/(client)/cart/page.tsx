"use client";

import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import NoAccess from "@/components/NoAccess";
import Title from "@/components/Title";
import { urlFor } from "@/sanity/lib/image";
import useStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

// Optional type
type Address = {
  street: string;
  city: string;
  postalCode: string;
};

const Cartpage = () => {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
    cartItems, // Optional: for debug
  } = useStore();

  const groupedItems = useStore((state) => state.getGroupedItems?.() || []);
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  // Debug logs
  console.log("🛒 Signed In:", isSignedIn);
  console.log("🛒 Cart Items:", cartItems);
  console.log("🛒 Grouped Items:", groupedItems);

  return (
    <div className="bg-gray-50 pb-52 md:pb-10">
      {isSignedIn ? (
        <Container>
          {groupedItems.length > 0 ? (
            <>
              <div className="flex items-center gap-2 py-5">
                <ShoppingBagIcon className="text-darkColor" />
                <Title>Shopping Cart</Title>
              </div>

              <div className="grid lg:grid-cols-3 md:gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 rounded-lg space-y-4">
                  {groupedItems.map((product) => {
                    const itemCount = product?._id ? getItemCount(product._id) : 0;
                    const hasImage = product?.images?.[0];
                    const slug = product?.slug?.current;

                    if (!product || !hasImage || !slug) {
                      console.warn("⚠️ Skipping invalid product:", product);
                      return null;
                    }

                    return (
                      <div key={product._id} className="border rounded-md p-2 flex gap-4 items-center">
                        <Link
                          href={`/product/${slug}`}
                          className="border p-0.5 md:p-1 rounded-md overflow-hidden group"
                        >
                          <Image
                            src={urlFor(hasImage).url()}
                            alt="Product Image"
                            width={500}
                            height={500}
                            loading="lazy"
                            className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 hoverEffect"
                          />
                        </Link>
                        <div className="flex flex-col justify-between">
                          <p className="text-lg font-medium">{product.title}</p>
                          <p className="text-sm text-gray-500">Quantity: {itemCount}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Summary Section */}
                <div className="border rounded-md p-4">
                  <h3 className="text-lg font-semibold mb-2">Summary</h3>
                  <p className="text-sm text-gray-700">Subtotal: KES {getSubTotalPrice()}</p>
                  <p className="text-sm text-gray-700">Total: KES {getTotalPrice()}</p>
                  <button
                    onClick={() => resetCart()}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccess />
      )}
    </div>
  );
};

export default Cartpage;
