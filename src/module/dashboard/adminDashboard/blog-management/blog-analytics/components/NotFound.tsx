import React from "react";
import notFoundImage from "../../../../../../assets/img/shared/404-1.png";

export default function NotFound() {
  return (
    <div className="animate-pulse opacity-80 w-2/3 mx-auto h-[80vh] -mt-16">
      <img src={notFoundImage} alt="Not Found" />
    </div>
  );
}
