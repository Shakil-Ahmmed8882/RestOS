import { IoCloseOutline } from "react-icons/io5";
import UpcomingEvent from "../../../../../../Components/Shared/upcoming-event/UpcomingEvent";

const Event = ({showUpcomingEvent,SetshowUpcomingEvent}) => {
    return (
        <div className={`absolute ${showUpcomingEvent ? ' translate-y-0 ease-soft-spring show-with-animation ' : 'hide-with-animation translate-y-[100%] ease-in'} transition-all duration-500 z-40 bg-[white] left-0 right-0 top-0 ml-3 md:ml-72 bottom-0`}>
            <UpcomingEvent />
            <IoCloseOutline onClick={() => SetshowUpcomingEvent(false)} className="z-40 absolute top-6 cursor-pointer text-[#aeaeae] right-9 text-4xl hover:text-[black] transition300 " />
        </div>
    );
};

export default Event; 