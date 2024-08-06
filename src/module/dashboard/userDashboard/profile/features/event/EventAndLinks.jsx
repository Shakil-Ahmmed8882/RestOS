import { useState } from "react";
import Event from "../../components/Event";
import QuickLinks from "../quickLinks/QuickLinks";

const EventAndLinks = () => {
    const [showUpcomingEvent, SetshowUpcomingEvent] = useState(false)
    const [showLink,setShowLink] = useState(false)
    return (
        <>

            {/* Reveals buttons */}
            <aside className="-mt-16 w-[50%] flex  gap-3">
                <button onClick={() => SetshowUpcomingEvent(true)} className="bg-[#f3f3f3] hover:bg-[#eeeeee] active:scale-95 transition-all duration-300 p-2 rounded-md ">upcoming </button>
                <button onClick={() => setShowLink(true)} className={`bg-[#f3f3f3] hover:bg-[#eeeeee] active:scale-95 transition-all duration-300 p-2 rounded-md`}>Quick links</button>
            </aside>
            {/* Hidden content */}
            <Event {...{ showUpcomingEvent, SetshowUpcomingEvent }} />
            <QuickLinks {...{showLink,setShowLink}}/>
        </>
    );
};

export default EventAndLinks; 