import { Outlet } from "react-router-dom";
import NavBar from "../Components/Shared/Header/Header";
import Footer from "../Pages/Home/Home/Footer";
const Main = () => {
  return (
    <>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default Main;
