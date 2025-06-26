import { Product } from "@/sanity.types";
import React from "react";
import Image from 'next/image';
import { urlFor } from "@/sanity/lib/image";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div>
      <div>
        {product?.images && (
          <Image
            src={urlFor(product?.images[0]).url()}
            alt="ProductImage"
            loading="lazy"
            width={700}
            height={700}
          />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
