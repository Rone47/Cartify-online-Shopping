import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import React from "react";


const Home = () => {
  return (
    <Container className=" bg-shop_light_pink max-w-8xl mx-auto rounded-lg shadow-md">
      <HomeBanner />
    </Container>
  );
};

export default Home;
