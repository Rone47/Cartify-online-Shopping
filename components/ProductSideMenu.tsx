"use client";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductSideMenu = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  const { favoriteProduct, addToFavorite } = useStore();
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const availableProduct = favoriteProduct.find(
      (item) => item?._id === product?._id
    );
    setExistingProduct(availableProduct || null);
  }, [product, favoriteProduct]);

  const handleFavorite = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const isFavorite = favoriteProduct.some(
      (item) => item._id === product._id
    );

    addToFavorite(product).then(() => {
      toast.success(
        isFavorite
          ? "Product removed from favorites!"
          : "Product added to favorites!"
      );
    });
  };

  return (
    <div className={cn("absolute top-2 right-2 hover:cursor-pointer", className)}>
      <div
        onClick={handleFavorite}
        className={`p-2.5 rounded-full transition-colors hover:bg-shop_dark_green/80 hover:text-white hoverEffect ${
          existingProduct ? "bg-shop_dark_green/80 text-white" : "bg-lightColor/10"
        }`}
      >
        <Heart
          size={15}
          className={cn("transition-all duration-200", {
            "fill-white text-white": existingProduct,
            "text-shop_dark_green": !existingProduct,
          })}
        />
      </div>
    </div>
  );
};

export default ProductSideMenu;
