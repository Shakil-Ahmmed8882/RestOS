import { Outlet } from "react-router-dom";
import NavBar from "../Components/Shared/Header/Header";
import Footer from "../Pages/Home/Home/Footer";
import { useTheme } from "next-themes";
const Main = () => {
  const {theme} = useTheme()
  const themeColor = theme == 'dark'?'bg-bgDark':''
  return (
    <>
    <div className={`${themeColor}`}>
      <div className="px-3">
      <NavBar></NavBar>
      <div className="px-0 md:px-0">
      <Outlet></Outlet>
      </div>
      <Footer></Footer>

      </div>
    </div>
    </>
  );
};

export default Main;
