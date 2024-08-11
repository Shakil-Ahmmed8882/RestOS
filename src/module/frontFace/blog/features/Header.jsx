// @ts-nocheck
import { Button, Input } from "antd";
import AddBlog from "./AddBlog";
const Header = () => {
  return (
    <section>
      <article className="md:flex justify-between space-y-8 pt-11 pb-2">
        <div className="md:w-[50%]">
          <h1>Blog</h1>
          <p className="text-[#878787] text-[20px]   pt-4 leading-7">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit hic nihil officia ex, expedita{" "}
          </p>

          <div className="flex justify-center h-12  mt-8 ">
            <Input
              type="text"
              className="mt-auto rounded-l-lg   border-r-0 rounded-r-none  bg-[white] h-full  focus-within:border-primaryColor placeholder:text-[18px] placeholder:text-[#989898] hover:border-primaryColor"
              placeholder="Enter your email"
            />
            <Button className="primaryGradient hover:!bg-primaryColor/80 hover:!text-[white] text-[white] border-none w-[30%] rounded-l-none rounded-r-lg h-full">
              Subscribe
            </Button>
          </div>
        </div>
        {/* <Button className="   p-6 rounded-full  border-none hover:!bg-primaryColor/10 hover:!text-primaryColor text-[18px] hover:border-none  hover:shadow-primaryColor/10 hover:shadow-xl">
          Add New Blog{" "}
        </Button> */}
        <AddBlog/>
      </article>
    </section>
  );
};

export default Header;
