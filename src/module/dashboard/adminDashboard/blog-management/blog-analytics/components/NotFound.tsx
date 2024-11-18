import React from "react";
import notFoundImage from "../../../../../../assets/img/shared/404-1.png";

export default function NotFound({vh="h-[80vh]", vw="w-2/3"}) {
  return (
    <div className={`${vh} animate-pulse opacity-80 ${vw} mx-auto  -mt-16`}>
      <img src={notFoundImage} alt="Not Found" />
    </div>
  );
}
