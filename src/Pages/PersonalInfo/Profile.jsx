import {Profile} from "../../Components/Shared/Profile/Profile";

const MyProfile = () => {
    return (
        <div className=" mt-4 md:grid lg:grid md:grid-cols-2 lg:grid-cols-8 gap-3 w-full">

        <h2 className="col-span-3">cloumn1</h2>    
        <h2 className="col-span-3">cloumn2</h2>    
        <Profile/>
        </div>
    );
};
export default MyProfile
