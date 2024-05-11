
import { UserProfileImage } from "../../../../../Utils/user";

const UserImage = () => {



    return (
        <>
            <img className="absolute animate-none -top-11 ml-16 rounded-full
                 border-[#fff] m-0 p-0 border-4 h-24 w-24 object-cover"
                src={`${UserProfileImage()}` || `https://media.istockphoto.com/id/1311433805/photo/side-view-profile-portrait-of-cute-african-american-girl.jpg?s=1024x1024&w=is&k=20&c=8kwLrFZAXk2oG3IUD1tm2zNmn4ybFkvWUDZ8o3BPheU=`} />
        </>
    );
};

export default UserImage; 