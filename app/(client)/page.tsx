import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import ProductsGrid from "@/components/ProductsGrid";
import React from "react";

const Home = () => {
  return (
    <Container className="bg-shop-light-pink">
      <HomeBanner />
      <ProductsGrid />
    </Container>
  );
};

export default Home;
