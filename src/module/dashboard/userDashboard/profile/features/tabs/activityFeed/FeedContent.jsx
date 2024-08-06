import React from "react";

const FeedContent = () => {
    return (
        <div className="flex gap-3">
            <div className="flex-1 space-y-5">
                <p className="text-[15px] text-[#727272]">Placed an order for chiecken</p>
                <button className="w-32 mt-3 shadow-sm text-primaryColor bg-[#f1fff5] p-2 rounded-md ml-auto ">See details</button>
            </div>
            <div className="w-full -mt-16 flex-1  relative overflow-hidden">
            <div className="absolute h-full w-full inset-0 bg-blend-overlay bg-gradient-to-tr from-[#ffffffc6] to-[#a0727200]"></div>
            <img className="  border border-[#fffbfb]  h-full object-cover" src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg" alt="" />
            </div>
        </div>
    );
};

export default FeedContent; 