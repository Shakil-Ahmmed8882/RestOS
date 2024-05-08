import ProfileDetails from "./ProfileDetails/ProfileDetails";
import { FaUserEdit } from "react-icons/fa";
import ProfileForm from "./ProfileForm";
import Edit from "./Edit/Edit";




const UserInfo = () => {
    return (
        <>
        <div>
            <div className="relative h-40 mb-16 ">
                <div className=" relative flex w-ful h-full items-center gap-3 gradient p-2 rounded-md animate-pulse">
                    
                </div>
                {/* profile image */}
                <div className="relative h-24 w-24">
                <img className="absolute animate-none -top-11 ml-16 rounded-full
                 border-[#fff] m-0 p-0 border-4 h-24 w-24 object-cover" src="https://media.istockphoto.com/id/1311433805/photo/side-view-profile-portrait-of-cute-african-american-girl.jpg?s=1024x1024&w=is&k=20&c=8kwLrFZAXk2oG3IUD1tm2zNmn4ybFkvWUDZ8o3BPheU=" alt="" />
                <Edit/>

                </div>
            </div>

            <div className="ml-16">
            <h1 className="text-2xl text-[#353535]">Shakil Ahmmed</h1>
            <p className="text-[gray] text-[20px]">foundar/CEO</p>
            
            <ProfileDetails/>
            </div>

    

        </div>

        </>
    );
};

export default UserInfo;