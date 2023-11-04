
import {useGetData} from "../../../🔗Hook/httpRequests";
import Banner from "./Banner";

const Home = () => {
 const {data} = useGetData({endpoint: "services",key: "serv"});

  console.log(data)


  return (
    <div className="h-screen">
      <Banner></Banner>
    </div>
  );
};

export default Home;