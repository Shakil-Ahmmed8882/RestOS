import React, { useState } from 'react';
import {Input,Button} from 'antd';
import { SearchIcon } from '../../../../assets/icons/Icons';
import Comment from '../components/comment';


const CommentSection = () => {


    const [focus,setFocus] = useState(false)
  return (
    <div className="w-full  font-sans pt-14">
      {/* Add Comment Box */}
      
      <div className="flex justify-center h-12 md:h-16 shadow-lg rounded-lg shadow-[#eaedebb9] ">
            <Input
                onFocus={()=> setFocus(true)}
                onBlur={()=> setFocus(false)}
              type="text"
              className="mt-auto rounded-l-lg    rounded-r-none   bg-[white] h-full border-none placeholder:text-[#413e3e]"
              placeholder="Comment"
            />
            <Button className={`${focus?'!bg-[black] !text-[white]':'bg-[#efefef] !text-[#000]'}  border-none hover:!text-primaryColor  text-[#c7c7c7] w-[30%] rounded-l-none rounded-r-lg h-full`}>
              send
            </Button>
          </div>

      {/* Comments */}
      <div className=" py-4">
      
       <Comment/>
       <Comment/>
       <Comment/>
       <Comment/>
       <Comment/>
       <Comment/>

        
      </div>
    </div>
  );
};

export default CommentSection;