// @ts-nocheck
import React from "react";
import { useAuth } from "../../Utils/useAuthHelper";
/*
Table of contents 
1. Delete
2. Close 
3. DownArrowIcon
5. Notification
6. UserAvater

*/


export const Delete = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5 text-[red] hover:shadow-xl cursor-pointer shadow-[#ff0000]"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
};

export const Close = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
};


export function DownArrowIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}



// Notification 
import { IoIosNotificationsOutline } from "react-icons/io";
export const Notification = () => {
  return (
    <>
      <div className="p-2 rounded-full bg-[#f7f7f7] relative flex-start">
        <span className="absolute w-[8px] h-[8px] border border-[white] block bg-deepPink top-[10px] right-[12px] z-10 rounded-full"></span>
        <IoIosNotificationsOutline className="text-2xl relative"></IoIosNotificationsOutline>
      </div>
    </>
  );
};


export const UserAvater = ({ size = "size-10" }) => {
  const { user } = useAuth();
  return (
    <>
      {" "}
      {user?.photoURL ? (
        <img
          className={`${size} rounded-full border border-[white]`}
          src={user?.photoURL}
          alt=""
        />
      ) : (
        <span className={`${size} block  rounded-full bg-primaryColor`}></span>
      )}
    </>
  );
};



