import React from "react";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";


const Dish = ({url}) => {
    return (
        <div className="bg-[white] p-2 py-4 rounded-lg shadow-md shadow-[#efefef] text-center space-y-2">
            <div className="w-1/2 mx-auto">
            <img className=" mx-auto rounded-lg" src={url} alt="" />
            </div>
            <h2 className="font-semi-bold text-[14px] md:text-[18px] pb-2 pt-3">Pita Chips</h2>
            <Link to={'/food'} className="bg-primaryColor text-[white] mt-2 h-7 w-7 rounded-full flex justify-center items-center mx-auto"><SlArrowRight/></Link>
        </div>
    );
};
export default Dish
