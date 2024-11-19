import React from "react";
import { CommentIcon } from "../../../../../assets/icons/Icons";
import { Card, CardBody, Image } from "@nextui-org/react";

const MyBlogCard = ({blogData}) => {
  return (
    <>
      <div className="md:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-light-gray italic">
            Featured Articles
          </h2>
        </div>
        <div className="space-y-6">
          {blogData?.map((article, index) => (
            <Card
              key={index}
              className="w-full rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <CardBody className="p-6">
                <article className="md:flex gap-6">
                  <div className="w-full h-full">
                  <Image
                    src={`${article?.image}`}
                    alt={article.title}
                    className="rounded-lg h-full w-full  object-cover"
                    />
                    </div>
                  <div className="flex flex-col  justify-between">
                    <div className="">
                      <h3 className="font-bold mt-5 md:mt-0 text-xl mb-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-[#8b8b8b] mb-2">
                        {article.description.slice(0,200)}.. 
                      </p>
                      <div className="flex gap-3 py-3">
                        <p className="text-primaryColor text-sm font-semibold">
                          {article.category}
                        </p>
                        <CommentIcon className="size-4" />
                      </div>
                    </div>
                  </div>
                </article>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyBlogCard;
