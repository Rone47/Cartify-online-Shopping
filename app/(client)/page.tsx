import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
import ProductsGrid from "@/components/ProductsGrid";
import ShopByBrands from "@/components/ShopByBrands";
import { getCategories } from "@/sanity/queries";
import React from "react";

const Home = async () => {
  const categories = await getCategories(6);

  return (
    <Container className="bg-shop-light-pink">
      <HomeBanner />
      <div className="py-10">
        <ProductsGrid />
        <HomeCategories categories={categories} />
        <ShopByBrands/>
      </div>
    </Container>
  );
};

export default Home;
