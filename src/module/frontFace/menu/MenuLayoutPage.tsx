import React, { useState } from "react";
import { MenuCard } from "./components/MenuCard";
import { Input } from "@nextui-org/react";
import SearchInput from "../../../shared/ui/SearchInput";

const menuItems = [
  {
    title: "Autumn Menu",
    image: "https://i.pinimg.com/736x/ca/dd/50/cadd508557ec689154a16749c5066f31.jpg",
    items: 8,
  },
  {
    title: "Salads",
    image: "https://i.pinimg.com/736x/ca/dd/50/cadd508557ec689154a16749c5066f31.jpg",
    items: 13,
  },
  {
    title: "Snacks",
    image: "https://i.pinimg.com/736x/ca/dd/50/cadd508557ec689154a16749c5066f31.jpg",
    items: 8,
  },
  {
    title: "Sushi",
    image: "https://i.pinimg.com/736x/ca/dd/50/cadd508557ec689154a16749c5066f31.jpg",
    items: 12,
  },
  {
    title: "Burgers",
    image: "https://i.pinimg.com/736x/ca/dd/50/cadd508557ec689154a16749c5066f31.jpg",
    items: 6,
  },
  {
    title: "Soups",
    image: "https://i.pinimg.com/736x/ca/dd/50/cadd508557ec689154a16749c5066f31.jpg",
    items: 12,
  },
  {
    title: "Main",
    image: "https://i.pinimg.com/736x/ca/dd/50/cadd508557ec689154a16749c5066f31.jpg",
    items: 23,
  },
  {
    title: "Side dishes",
    image: "https://i.pinimg.com/736x/ca/dd/50/cadd508557ec689154a16749c5066f31.jpg",
    items: 6,
  },
  {
    title: "Bakery",
    image: "https://i.pinimg.com/736x/ca/dd/50/cadd508557ec689154a16749c5066f31.jpg",
    items: 6,
  },
  {
    title: "Desserts",
    image: "https://i.pinimg.com/736x/ca/dd/50/cadd508557ec689154a16749c5066f31.jpg",
    items: 11,
  },
  {
    title: "Drinks",
    image: "https://i.pinimg.com/736x/ca/dd/50/cadd508557ec689154a16749c5066f31.jpg",
    items: 6,
  },
];

export default function MenuLayoutPage() {
  const [searchTerm, setSearchTerm] = useState("")


  return (
    <div className=" bg-white p-8">
      <h1 className=" text-4xl font-bold text-center mb-4">Menu</h1>
        <SearchInput className="mb-11 w-4/5 mx-auto" onChange={setSearchTerm}/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <MenuCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
