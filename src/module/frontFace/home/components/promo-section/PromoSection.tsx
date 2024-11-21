import React from "react";
import { Button } from "@nextui-org/react";
import sprinkleTomato from "../../../../../assets/img/home/sprinkleTomato.png";
import promofood1 from "../../../../../assets/img/demo-image/promofood1.png";
import promofood2 from "../../../../../assets/img/demo-image/promofood2.png";
import Container from "../../../../../shared/layouts/Container";

export default function PromoSection() {
  return (
    <section className="">
      <Container className="grid grid-cols-2 gap-4 p-8">
      <div className="flex h-80 group bg-[#f3ffef] relative p-6 overflow-hidden rounded-lg ">
          <div>
            <h3 className="mt-4 text-lg font-bold text-green-800">VEGETABLE</h3>
            <h2 className="text-2xl font-bold text-green-900">GREEN WORLD</h2>
            <p className="mt-2 text-green-700">
              Get 40% Off on selected items.
            </p>
            <Button className="mt-4 bg-[white] text-white hover:bg-green-500">
              Learn More
            </Button>
          </div>

          <img src={promofood1} alt="Green World" className="rounded-md group-hover:translate-x-56  absolute -top-11 translate-x-72 transition-all duration-700 cursor-pointer" />
        </div>


        <div className="flex h-80 bg-[#fffbe5] group relative p-6 overflow-hidden rounded-lg ">
          <div>
            <h3 className="mt-4 text-lg font-bold text-green-800">VEGETABLE</h3>
            <h2 className="text-2xl font-bold text-green-900">GREEN WORLD</h2>
            <p className="mt-2 text-green-700">
              Get 40% Off on selected items.
            </p>
            <Button className="mt-4 bg-[white] text-white hover:bg-green-500">
              Learn More
            </Button>
          </div>

          <img src={promofood2} alt="Green World" className="rounded-md group-hover:translate-x-56 -rotate-45 absolute top-0 translate-x-72 transition-all duration-700 cursor-pointer" />
        </div>
      </Container>
    </section>
  );
}
