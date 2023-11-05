
import { useTheme } from "next-themes";
import {useGetData} from "../../../🔗Hook/httpRequests";
import Banner from "./Banner";

const Home = () => {
 const {data} = useGetData({endpoint: "services",key: "serv"});

  const {theme} = useTheme()


  return (
    <div className={`h-[60vh] ${theme == "light" ? "bg-[blue]" : "bg-bgDark"}`}>
      <Banner></Banner>
    </div>
  );
};

export default Home;