import { useTheme } from "next-themes";
import { BiSearchAlt } from "react-icons/bi";
import AnimatedBlub from "./animatedBlub/AnimatedBlub";

const NoDataFound = () => {
  const { theme } = useTheme();
  return (
    <div>
      <div className="flex h-screen gap-3 justify-center items-center">
        <h1>
          {" "}
          <span
            className={`text-5xl font-bold ${
              theme == "dark" ? "text-[white]" : ""
            }`}
          >
            No data found
          </span>
        </h1>
        <BiSearchAlt className="text-6xl text-primaryColor"></BiSearchAlt>
        <div>
          <AnimatedBlub></AnimatedBlub>
        </div>
      </div>
    </div>
  );
};

export default NoDataFound;
