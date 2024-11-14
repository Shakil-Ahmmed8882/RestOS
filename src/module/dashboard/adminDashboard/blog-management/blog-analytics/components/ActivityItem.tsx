import React from "react";
import { Avatar } from "@nextui-org/react";

export default function ActivityItem({ activity }) {
  return (
    <div className={`p-2 rounded shadow-sm ${activity.colorClass}`}>
      <div className="flex gap-2 items-center font-semibold">
        <Avatar  className="!size-6" src={activity.user.photo} alt={activity.userName} />
        <p className="text-[gray]">{activity.userName}</p>
      </div>
      <p className="mt-1 text-[gray]">{activity.description}</p>
      <p className="text-sm text-[gray]">{activity.date}</p>
    </div>
  );
}
