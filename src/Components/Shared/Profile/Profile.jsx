import { Avatar } from "@nextui-org/react";

export const Profile = () => {
  return (

    <div className="relative h-52">
    <div className="relative flex justify-center bg-gradient-to-tr from-primaryColor to-[#0cb761] h-24">
    <div className="-bottom-24 flex flex-col items-center  absolute">
    <div className="">
    <Avatar className="w-20  border-6 border-[#eeeeee6c] h-20" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />,
    </div>
    <h2 className="font-bold -mt-2 text-[18px]">Shakil Ahmmed</h2>
    <p className="text-[#a6a6a6]"> Brand new admin dashboard</p>
    </div>
    </div>
    </div>
  );
};

