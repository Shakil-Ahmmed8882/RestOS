import React from "react";
import { CiSearch } from "react-icons/ci";

const Search = () => {
    return (
        <>
            <div className="hidden lg:flex items-center shadow-md bg-[white] pr-8 pl-3 rounded-full">
                <CiSearch />
                <input className="flex-1 p-2 rounded-lg focus-within:outline-none" type="text" placeholder="Search.." />
            </div> </>
    );
};
export default Search
