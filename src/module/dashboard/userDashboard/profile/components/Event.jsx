


import { IoCloseOutline } from "react-icons/io5";
import UpcomingEvent from "../../../../../Components/Shared/upcoming-event/UpcomingEvent";
import React from "react";
import SpringAnimateContainer from "../../../../../shared/animations/SpringAnimateContainer";

const Event = ({showUpcomingEvent ,SetshowUpcomingEvent}) => {
    return (
        <SpringAnimateContainer>
        <div className={`absolute ${showUpcomingEvent ? ` translate-y-0 ease-soft-spring show-with-animation ` : 'hide-with-animation translate-y-[100%] ease-in'} absolute transition-all duration-500 z-40 bg-[white] left-0 right-0 top-0  bottom-0`}>
            <UpcomingEvent />
            <IoCloseOutline onClick={() => SetshowUpcomingEvent(false)} className="z-40 absolute top-6 cursor-pointer text-[#aeaeae] right-9 text-4xl hover:text-[black] transition300 " />
        </div>
        </SpringAnimateContainer>
    );
};

export default Event; 