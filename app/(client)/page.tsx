import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
import ProductsGrid from "@/components/ProductsGrid";
import React from "react";

const Home = () => {
  return (
    <Container className="bg-shop-light-pink">
      <HomeBanner />
      <div className="py-10">
        <ProductsGrid />
        <HomeCategories />
      </div>
    </Container>
  );
};

export default Home;
