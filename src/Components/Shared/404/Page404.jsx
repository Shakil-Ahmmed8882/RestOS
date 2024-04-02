import { Link } from "react-router-dom";
import home from '../../../assets/img/home.gif'
import search from '../../../assets/img/search.gif'

const Page404 = () => {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="flex flex-col  items-center">
        <h1 className="text-[120px] font-extrabold text-gray-700">404</h1>
        <p className="text-2xl font-medium text-gray-600 mb-6">
          Page Not Found
        </p>
            <Link to='/' className="px-4 py-2 font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition-all duration-200 ease-in-out flex items-center btn h-full bg-bgBabyBlue">
          <img className="w-9 md:w-11" src={home} alt="" /><span className="text-2xl ">Go home</span></Link>
      </div>
      <img className="absolute md:w-6/12 md:top-0 right-6 md:right-[295px] -z-10" src={search} alt="" />
    </div>
  );
};

export default Page404;
