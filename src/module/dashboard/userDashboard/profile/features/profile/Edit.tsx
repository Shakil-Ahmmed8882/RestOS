// @ts-nocheck
import { FaUserEdit } from "react-icons/fa";
import ProfileForm from "./ProfileForm";
import { createContext, useState } from "react";


export const profileContext = createContext(null)
const Edit = () => {

    const [isReveal,setIsReveal] = useState(false)

    const data = {
        isReveal,
        setIsReveal
    }

    return (
        <profileContext.Provider value={data}>
            <button onClick={()=>setIsReveal(!isReveal)} className="cursor-pointer absolute top-2 shadow-lg -right-14 text-[white] border-3 rounded-full p-[1px]"><FaUserEdit /></button>
            <div  className="relative left-32">
                <ProfileForm/>
            </div>
        </profileContext.Provider>
    );
};

export default Edit; 