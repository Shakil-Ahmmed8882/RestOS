import { Avatar } from "@nextui-org/react";
import { useAuth } from "../../../Utils/useAuthHelper";

export const Profile = () => {

  const {user} = useAuth()

  return (

    <div className="bg-[white] col-span-2 relative  w-full rounded-lg">
      <div className="rounded-t-lg relative flex flex-col items-center justify-center bg-gradient-to-tr from-[#f9fffa] to-[rgb(225,255,234)] h-24">
        <div className="top-11 flex flex-col items-center absolute">
            <Avatar className="w-20  border-6 border-[#eeeeee6c] h-20" src={user?.photoURL || 'https://i.pravatar.cc/150?u=a042581f4e29026024d'} />,          
        </div> 
      </div>
      <div className="text-center mt-16">
      <h2 className="font-bold -mt-2 text-[18px]">{user?.displayName || 'Shakil Ahmmed'}</h2>
          <p className="text-[#a6a6a6]"> Brand new user dashboard</p>

      </div>

    </div>
  );
};

