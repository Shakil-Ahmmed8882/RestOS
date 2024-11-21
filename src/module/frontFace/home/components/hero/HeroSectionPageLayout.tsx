import React from "react";

import { Button } from "@nextui-org/react";
import arinaraPastaWithPoachedEggs  from "../../../../../assets/img/demo-image/arinaraPastaWithPoachedEggs.jpg";
import Container from "../../../../../shared/layouts/Container";

export default function HeroSectionPageLayout() {
  return (
    <div className="bg-[#f5fff6] p-8">
    <Container>
    <section className=" flex items-center justify-between">
      <div className="w-1/2 h-80">
        <img
          src={arinaraPastaWithPoachedEggs}
          alt="Sauce and food"
          className="h-full w-full object-cover "
        />
      </div>
      <div className="max-w-md">
        <h2 className="text-sm text-orange-600">About us</h2>
        <h1 className="text-4xl font-bold text-gray-800">
          Simple Way of Eating Delicious
        </h1>
        <p className="mt-4 text-gray-600">
          Keep healthy food readily available. When you get hungry, you're
          more likely to eat the first thing you see on the counter or in the
          fridge.
        </p>
        <Button
          className="mt-6 bg-[white] "
          size="lg"
        >
          Explore Our Story
        </Button>
      </div>
    </section>

    </Container>
    </div>
  );
}
