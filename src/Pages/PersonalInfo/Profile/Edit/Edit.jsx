import { FaUserEdit } from "react-icons/fa";
import ProfileForm from "../ProfileForm";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const Edit = () => {


    const [showProfileForm,setShowProfileForm] = useState(false)

    return (
        <>
            <span onClick={()=>setShowProfileForm(!showProfileForm)} className="cursor-pointer absolute top-2 shadow-lg -right-14 text-[white] border-3 rounded-full p-[1px]"><FaUserEdit /></span>
            <div className={`${showProfileForm?' visible left-0  ease-in opacity-100':"opacity-0 -left-1/2   invisible"} transition-all duration-700 bg-[white]
             fixed -top-20  w-1/3 z-50  mt-20 pt-16`}>
                <ProfileForm />
                <IoCloseOutline onClick={() => setShowProfileForm(false)} className="z-40 absolute top-6 cursor-pointer text-[#aeaeae] right-9 text-4xl hover:text-[black] transition300 " />
            </div>

        </>
    );
};

export default Edit; 