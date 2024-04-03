import React from "react";
import { Avatar, AvatarGroup } from "@nextui-org/react";

const GroupAvatar = (ProfilesArray) => {
  return (
    <div className="w-full pt-5 pb-5 text-left flex">

    <AvatarGroup  isBordered>
      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />,
      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />,
      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />,
      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />,
      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />,
      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
    </AvatarGroup>

    </div>
  );
};

export default GroupAvatar;
