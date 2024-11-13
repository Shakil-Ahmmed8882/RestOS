
import { Button } from "@nextui-org/react";
import React from "react";
import { useNavigate } from "react-router-dom";

import blogImg1 from "../../../../../assets/img/blogs/blog1.svg";

const PopularTopics = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Popular Topics */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Popular Topics</h2>
          <Button
            onClick={() => navigate("/blog")}
            size="lg"
            className="w-fit bg-[#f7fff8] font-normal text-primaryColor"
          >
            View all
          </Button>
        </div>
        <div className="space-y-4">
          {[
            { name: "Restaurant Technology", subscribers: "15.2K followers" },
            { name: "Staff Management", subscribers: "12.8K followers" },
            { name: "Menu Optimization", subscribers: "10.5K followers" },
            { name: "Customer Experience", subscribers: "9.7K followers" },
          ].map((topic, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300"
            >
              <div className="bg-blue-100 size-16 text-blue-600 rounded-full p-2">
                <img alt="" src={`${blogImg1}`} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{topic.name}</h3>
                <p className="text-[#888888]">{topic.subscribers}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PopularTopics;
