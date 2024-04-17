import { IoIosNotificationsOutline } from "react-icons/io";
import Notification from "./Notification";
import UserAvater from "./UserAvater";
import { useAuth } from "../../../Utils/useAuthHelper";

const UserAndNotification = () => {
    const { user } = useAuth()
    return (
        <>   <div className="flex gap-1 items-start">
            <UserAvater />
            <div>
                <h2 className="font-bold text-[15px]">{user?.displayName}</h2>
                <p className="text-[#c3c3c3] text-[14px]">{user?.email.split("@")[0]}..</p>
            </div>
            <Notification />
        </div> </>
    );
};
export default UserAndNotification
