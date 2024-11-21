import React from "react";
import SearchInput from "../../../../shared/ui/SearchInput";
import airPlane from "../../../../assets/img/shared/airplane.jpg"

const SavedBlogSearch = ({ setSearchTerm }: any) => {
  return (
    <div className="flex mb-5 items-center">
      <div className="w-2/3">
        <SearchInput onChange={setSearchTerm} className="w-full" />
      </div>
      <div className="w-1/3">
        <img src={airPlane} className="w-full h-32 hidden md:block !opacity-30" />
      </div>
    </div>
  );
};

export default SavedBlogSearch;
