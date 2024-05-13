import { useAuth } from "../../../Utils/useAuthHelper";

const UserAvater = () => {

    const { user } = useAuth()
    return (
        <>            {
            (user?.photoURL) ? <img className="w-10 h-10 rounded-full border border-[white]" src={user?.photoURL} alt="" /> :
                <span className="block w-10 h-10 rounded-full bg-primaryColor"></span>
        }
        </>
    );
};
export default UserAvater
