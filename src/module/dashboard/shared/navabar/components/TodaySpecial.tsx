import { Button } from "@nextui-org/react";
import React from "react";
import star from "../../../../../assets/img/dashboard/star.png"
import PopHoverWrapperProps from "../../../../../shared/ui/wrapper/PopoverHoverWrapper";

const TodaySpecial = () => {
  return (
    <section>
      
      <PopHoverWrapperProps triggerElement={<img src={star} className="size-10" alt=""/>}
       title="Today's Special" />
    </section>
  );
};

export default TodaySpecial;