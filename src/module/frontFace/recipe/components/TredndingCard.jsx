import React from "react";

const TredndingCard= ({item}) => {
  return (
    <article className="flex    items-center gap-2 justify-between group cursor-pointer py-5 px-4 transition500 border-b pb-2 border-[#e9e8e8eb] ">
    <li className="text-gray-800 fill-base-2 flex-2">
      {item.title}
    </li>
    <div className="rounded-full w-14 h-14 overflow-hidden">
    <img
      src={item?.thumbnail}
      className=" w-full h-full object-cover group-hover:scale-[1.5] transition500"
      alt=""
    />

    </div>
  </article>
  );
};

export default TredndingCard; 