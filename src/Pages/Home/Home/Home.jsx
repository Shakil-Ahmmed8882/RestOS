
import { useTheme } from "next-themes";
import {useGetData} from "../../../🔗Hook/httpRequests";
import Banner from "./Banner";

const Home = () => {
 const {data} = useGetData({endpoint: "services",key: "serv"});

  const {theme} = useTheme()


  return (
    <div className={`h-[80vh ${theme == "light" ? "" : "bg-bgDark"}`}>
      <Banner></Banner>
    </div>
  );
};

export default Home;