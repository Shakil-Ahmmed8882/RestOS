import { Button, Card, CardBody, Image } from "@nextui-org/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import blogImg from "../../../../../assets/img/blogs/blog2.png";

const MyBlogHeader = () => {
  const navigate = useNavigate();

  return (
    <>
      <Card className="w-full mb-12  bg-[#f8f8f8d2] overflow-hidden shadow-none">
        <CardBody className="flex p-0 relative">
          <div className="flex">
            <div className=" z-50 right-0 w-2/3 bg-black bg-opacity-50 flex flex-col justify-center p-8">
              <h1 className="text-4xl  font-bold mb-4">
                Hey Here Are Your All Blogs
              </h1>
              <p className="text-xl mb-6 text-[#838383]">
                Discover how RestaurantOS is transforming the industry Discover
                how RestaurantOS is transforming the industry
              </p>
              <Button
                onClick={() => navigate("/blog")}
                size="lg"
                className="w-fit bg-primaryColor text-[white] rounded-md font-normal "
              >
                Read Latest Article
              </Button>
            </div>

            <Image
              src={blogImg}
              alt="Restaurant management system"
              className="w-full hidden md:block h-[260px] object-right object-cover"
            />
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default MyBlogHeader;
