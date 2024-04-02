import { CiSearch } from "react-icons/ci";
import { LuMessagesSquare } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";

export const Searchbar = () => {
  return (
    <>
      <div className="flex w-1/3 items-center space-x-2 bg-white p-1 rounded-md ">
        <CiSearch className="relative text-2xl text-gray-500 left-8" />
        <input
          className="flex h-9 w-full pl-8 rounded-md bg-background px-3 py-2 text-sm   file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground shadow-sm outline outline-[1px]  outline-[#dadadacb] focus:outline focus:outline-[1px]  focus:outline-[#979797cb]"
          placeholder="Search..."
          type="text"
        />
        <div className="outline outline-[1px]  outline-[#dadadacb] cursor-pointer px-2 h-9 rounded-lg flex items-center justify-center">
          <LuMessagesSquare />
        </div>
        <div className="outline outline-[1px]  outline-[#dadadacb] cursor-pointer px-2 h-9 rounded-lg flex items-center justify-center">
          <IoSettingsOutline />
        </div>
      </div>
    </>
  );
};
