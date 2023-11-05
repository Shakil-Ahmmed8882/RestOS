import { Outlet } from "react-router-dom";
import NavBar from "../Components/Shared/Header/Header";
import Footer from "../Pages/Home/Home/Footer";
const Main = () => {
  return (
    <>
    <div>
      <NavBar></NavBar>
      <div className="px-3">
      <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
    </>
  );
};

export default Main;
