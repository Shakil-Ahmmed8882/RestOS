import React from "react";
import ActivityItem from "../ActivityItem";
import { Divider } from "@nextui-org/react";

export default function CommentActivity({ data }) {

    
    console.log(data)
  return (
    <div>
      <h3 className="font-bold text-xl mb-4">Comments</h3>
      {data.map((activity, index) => (
                <>
                <ActivityItem key={index} activity={activity} />
                {
                    <>
                    <img src={activity?.blog?.image ||""} alt="" />
                    <p className="text-primaryColor/60 inline-block rounded-full p-1">{activity?.resourceName || "...."}</p>
                    <Divider className="my-2"/>
                    </>
                    
                }
                </>
      ))}
    </div>
  );
}
