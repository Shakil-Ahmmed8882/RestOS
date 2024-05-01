import SocialLinks from "./SocialLinks/SocialLinks";



const UserInfo = () => {
    return (
        <>
        <div>
            <div className="relative h-40 mb-16 ">
                <div className=" flex w-ful h-full items-center gap-3 bg-gradient-to-r from-[#e1ffe4] to-[#e8d6ff] p-2 rounded-md animate-pulse">
                </div>
                {/* profile image */}
                <img className="absolute animate-none -bottom-11 ml-16 rounded-full border-[#fff] m-0 p-0 border-4 h-24 w-24 object-cover" src="https://media.istockphoto.com/id/1311433805/photo/side-view-profile-portrait-of-cute-african-american-girl.jpg?s=1024x1024&w=is&k=20&c=8kwLrFZAXk2oG3IUD1tm2zNmn4ybFkvWUDZ8o3BPheU=" alt="" />
            </div>

            <div className="ml-16">
            <h1 className="text-2xl text-[#353535]">Shakil Ahmmed</h1>
            <p className="text-[gray] text-[20px]">foundar/CEO</p>
            
            <SocialLinks/>

            </div>
        </div>

        </>
    );
};

export default UserInfo;