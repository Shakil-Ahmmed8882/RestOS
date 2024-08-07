import React from "react";
import { IoIosNotificationsOutline } from "react-icons/io";

const Notification = () => {
  return (
    <>
      <div className="p-2 rounded-full bg-[#f7f7f7] relative flex-start">
        <span className="absolute w-[8px] h-[8px] border border-[white] block bg-deepPink top-[10px] right-[12px] z-10 rounded-full"></span>
        <IoIosNotificationsOutline className="text-2xl relative"></IoIosNotificationsOutline>
      </div>
    </>
  );
};
export default Notification;
