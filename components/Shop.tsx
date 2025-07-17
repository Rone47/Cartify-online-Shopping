"use client";

import { BRANDS_QUERYResult, Category, Product } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import Title from "./Title";
import CategoryList from "./shop/CategoryList";
import { useSearchParams } from "next/navigation";
import BrandList from "./shop/BrandList";
import PriceList from "./shop/PriceList";
import { client } from "@/sanity/lib/client";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";
import { Loader2 } from "lucide-react";

interface Props {
  categories: Category[];
  brands: BRANDS_QUERYResult;
}

const currencyOptions = [
  { label: "USD ($)", symbol: "USD", locale: "en-US", rate: 1 },
  { label: "KES (Ksh)", symbol: "KES", locale: "en-KE", rate: 130 },
  { label: "EUR (€)", symbol: "EUR", locale: "de-DE", rate: 0.92 },
  { label: "INR (₹)", symbol: "INR", locale: "hi-IN", rate: 83 },
  { label: "GBP (£)", symbol: "GBP", locale: "en-GB", rate: 0.78 },
];

const Shop = ({ categories, brands }: Props) => {
  const searchParams = useSearchParams();
  const brandParams = searchParams?.get("brand");
  const categoryParams = searchParams?.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParams || null
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    brandParams || null
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  // Currency is only for display, not filtering
  const [selectedCurrency, setSelectedCurrency] = useState(currencyOptions[0]);

  const fetchProducts = React.useCallback(async () => {
    setLoading(true);
    try {
      const query = `
        *[_type == 'product' 
          && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id))
          && (!defined($selectedBrand) || references(*[_type == "brand" && slug.current == $selectedBrand]._id))
        ] 
        | order(name asc) {
          ..., "categories": categories[]->title
        }
      `;

      const data = await client.fetch(
        query,
        { selectedCategory, selectedBrand },
        { next: { revalidate: 0 } }
      );

      setProducts(data);
    } catch (error) {
      console.error("Shop product fetching Error", error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedBrand]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Only apply price filter IF a price range is selected
  const getFilteredProducts = () => {
    if (!selectedPrice) return products;

    const [min, max] = selectedPrice.split("-").map(Number);

    return products.filter((product) => {
      if (typeof product.price !== "number") return false;
      const converted = product.price * selectedCurrency.rate;
      return converted >= min && converted <= max;
    });
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="border-t">
      <Container className="mt-5">
        <div className="sticky top-0 z-10 mb-5">
          <div className="flex items-center justify-between">
            <Title className="text-lg uppercase tracking-wide">
              Get the products as your need
            </Title>
            <div className="flex gap-4 items-center">
              <label htmlFor="currency-select" className="sr-only">
                Select currency
              </label>
              <select
                id="currency-select"
                aria-label="Select currency"
                value={selectedCurrency.symbol}
                onChange={(e) => {
                  const found = currencyOptions.find(
                    (c) => c.symbol === e.target.value
                  );
                  if (found) setSelectedCurrency(found);
                }}
                className="text-sm border px-2 py-1 rounded bg-white"
              >
                {currencyOptions.map((c) => (
                  <option key={c.symbol} value={c.symbol}>
                    {c.label}
                  </option>
                ))}
              </select>
              {(selectedCategory || selectedBrand || selectedPrice) && (
                <button
                  className="text-shop_dark_green underline text-sm mt-2 font-semibold hover:text-red-500 hoverEffect"
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedBrand(null);
                    setSelectedPrice(null);
                  }}
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5 border-t border-t-shop_dark_green/50">
          <div className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5 md:border-r border-r-shop_btn_dark_green/50 scrollbar-hide">
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <BrandList
              brands={brands}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
            />
            <PriceList
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
              currencySymbol={selectedCurrency.symbol}
              locale={selectedCurrency.locale}
              exchangeRate={selectedCurrency.rate}
            />
          </div>

          <div className="flex-1 pt-5">
            <div className="h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-hide">
              {loading ? (
                <div className="p-20 flex flex-col gap-2 items-center justify-center bg-white">
                  <Loader2 className="w-10 h-10 text-shop_dark_green animate-spin" />
                  <p className="font-semibold tracking-wide text-base">
                    Product is loading . . .
                  </p>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <NoProductAvailable className="bg-white mt-0" />
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;
