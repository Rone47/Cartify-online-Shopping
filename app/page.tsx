import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import React from "react";


const Home = () => {
  return (
    <Container className=" bg-shop_light_pink">
      <h2 className="text-xl font-semibold">Home</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, nulla,
        quod inventore, eum aliquam animi error ipsum reprehenderit nobis quia
        labore deleniti nam vitae eius voluptates molestiae at. Nobis
        repellendus illo repellat ducimus? Minus facere ullam sit molestiae
        numquam iusto officia aspernatur, officiis esse corporis voluptates
        maiores itaque minima nulla.
      </p>
      <Button size="lg">Check it out</Button>
    </Container>
  );
};

export default Home;
