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
    <div className="border-t bg-white">
      <Container className="mt-6">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white pb-3 pt-2 md:pt-0">
          <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
            <Title className="text-xl sm:text-2xl uppercase tracking-wide font-semibold text-gray-800">
              Browse Our Products
            </Title>
            <div className="flex flex-wrap items-center gap-3">
              <label htmlFor="currency-select" className="sr-only">
                Select Currency
              </label>
              <select
                id="currency-select"
                value={selectedCurrency.symbol}
                onChange={(e) => {
                  const found = currencyOptions.find(
                    (c) => c.symbol === e.target.value
                  );
                  if (found) setSelectedCurrency(found);
                }}
                className="text-sm border border-gray-300 px-3 py-1.5 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-shop_dark_green focus:border-transparent"
              >
                {currencyOptions.map((c) => (
                  <option key={c.symbol} value={c.symbol}>
                    {c.label}
                  </option>
                ))}
              </select>

              {(selectedCategory || selectedBrand || selectedPrice) && (
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedBrand(null);
                    setSelectedPrice(null);
                  }}
                  className="text-sm text-shop_dark_green underline font-medium hover:text-red-500 transition"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="flex flex-col md:flex-row gap-6 mt-4">
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0 space-y-4 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:h-[calc(100vh-160px)] md:overflow-y-auto scrollbar-hide">
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
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="flex flex-col gap-3 items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-shop_dark_green animate-spin" />
                <p className="text-gray-600 font-medium">
                  Loading products...
                </p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <NoProductAvailable className="mt-10" />
            )}
          </main>
        </div>
      </Container>
    </div>
  );
};

export default Shop;
