import React from "react";
import FeedContent from "./FeedContent";

const FeedCard = ({ activity }) => {
  return (
    <>
      <div className="bg-[white] shadow-lg mt-3 p-7 rounded-lg">
        <div className=" flex  gap-4 justify-between">
          <img
            className="w-10 border border-[#fffbfb] h-8 rounded-full"
            src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
            alt=""
          />
          <div className="flex gap-8">
            <div className="space-y-2 ">
              <h2 className="text-[22px] font-medium">shakil ahmmed</h2>
              <p className="text-[#9a9a9a] text-[16px]">13/6/2024 10:02am</p>
              <FeedContent />
            </div>
          </div>
          {/* <span className={`${activity == 'order' ? 'bg-gradient-to-tr from-[#effff3] to-[rgb(207,255,204)]' : 'bg-gradient-to-tr from-[#f1efff] to-[#dfdcff]'} h-9 p-2 text-sm  rounded-full`}>{activity}</span> */}
        </div>
      </div>
    </>
  );
};

export default FeedCard;
