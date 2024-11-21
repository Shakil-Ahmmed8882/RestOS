import { Image } from "@nextui-org/react";
import React from "react";
import noDataFound from "../../assets/img/shared/no-data.gif"

const NoDataFound = ({className=""}) => {
  return (
    <section className={`${className} flex justify-center -mt-11`}>
      <Image src={`${noDataFound}`} className="animate-pulse opacity-90"/>
    </section>
  );
};

export default NoDataFound;