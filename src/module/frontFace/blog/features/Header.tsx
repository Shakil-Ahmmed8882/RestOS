// @ts-nocheck
import { Button, Input } from "antd";
import AddBlog from "./AddBlog";
const Header = () => {
  return (
    <article className=" md:flex justify-between space-y-8 pt-11 pb-2 ">
      <div className="">
        <div className="flex items-start justify-between">
        <h1>Blog</h1>
        <AddBlog />
        </div>
        <article className=" sm:w-[80%] lg:w-[60%]">
        <p className="description pt-8 md:pt-4">
          This is your creativity vault. Let's let world know what's on your mind. The world needs your innovation. 
        </p>

        <div className="flex justify-center h-10 sm:h-11 md:12  mt-11 ">
          
          <Input
            type="text"
            className="mt-auto rounded-l-lg   border-r-0 rounded-r-none  bg-[white] h-full focus-within:border-primaryColor hover:border-primaryColor"
            placeholder="Enter your email"
          />
          <Button className="primaryGradient hover:!bg-primaryColor/80 hover:!text-[white] text-[white] border-none w-[30%] rounded-l-none rounded-r-lg h-full">
            Subscribe
          </Button>
        </div>

        </article>
      </div>
    
      
    </article>
  );
};

export default Header;
