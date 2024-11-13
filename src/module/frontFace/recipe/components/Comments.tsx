import React from "react";

import boy from '../../../../assets/img/home/boy.png'
import { LikeIcon } from "../../../../assets/icons";

const Comment= () => {
  return (
     <div className="mb-6">
          <div className="flex items-center mb-2 mt-5">
            <span className="w-8 h-8 flex justify-center items-center rounded-full bg-blue-500 text-white text-center leading-6 mr-2 ">
                <img src={boy} alt="" />
            </span>
            <span className="font-bold mr-2">Mark Hamilton</span>
            <span className="text-gray-500 text-sm mr-2">1h</span>
          </div>
          <div className="pl-10">
            <p className='text-[15px] description leading-6'>
              Freedom to think as you will and to speak as you think are means indispensable to the discovery and spread of political truth; ... without free speech and assembly, discussion would be futile; ... with them, discussion affords ordinarily adequate protection.
            </p>
          </div>
          <div className="flex items-center pl-10 pt-5 text-blue-500 text-sm">
            <span className="mr-4 cursor-pointer flex items-center gap-2">100 <LikeIcon className="text-md"/></span>
            <span className="cursor-pointer">Reply</span>
          </div>
        </div>
  );
};

export default Comment; 