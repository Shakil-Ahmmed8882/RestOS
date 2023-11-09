import { useTheme } from "next-themes";
import Banner from "./Banner";
import TopSellingFood from "./Top-selling-food/TopSellingFood";
import MealsCategory from "../../MealsCategory/MealsCategory";
const Home = () => {
  const { theme } = useTheme();



  return (
    <div className={`max-w-7xl mx-auto ${theme == "light" ? "" : "bg-[black]"}`}>
      <Banner></Banner>
      <TopSellingFood></TopSellingFood>
      <MealsCategory></MealsCategory>
    </div>
  );
};

export default Home;
