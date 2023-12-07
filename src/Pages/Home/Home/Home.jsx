import { useTheme } from "next-themes";
import Banner from "./Banner";
import TopSellingFood from "./Top-selling-food/TopSellingFood";
import MealsCategory from "../../MealsCategory/MealsCategory";
import SearchByLeter from "../../SearchByLetter/SearchByLeter";
import { Helmet } from "react-helmet";

const Home = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`${theme == "light" ? "" : "bg-[black]"}`}>
      <Helmet>
        <title>RestOs || Home</title>
      </Helmet>
      ;<Banner></Banner>
      <div className="">
        <TopSellingFood></TopSellingFood>
      </div>
      <SearchByLeter></SearchByLeter>
      <MealsCategory></MealsCategory>
    </div>
  );
};

export default Home;
