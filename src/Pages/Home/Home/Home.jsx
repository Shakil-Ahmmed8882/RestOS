import { useTheme } from "next-themes";
import Banner from "./Banner";
import TopSellingFood from "./Top-selling-food/TopSellingFood";

const Home = () => {
  const { theme } = useTheme();

  return (
    <div className={`h-[80vh ${theme == "light" ? "" : "bg-bgDark"}`}>
      <Banner></Banner>
      <TopSellingFood></TopSellingFood>
    </div>
  );
};

export default Home;
