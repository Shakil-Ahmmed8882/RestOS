import Search from "../../../Components/Shared/Search/Search";
import UserAndNotification from "../../../Components/Shared/user&notification/UserAndNotification";
import YearDropdown from "../user/YearDropdown";

const DashboardNavbar = () => {
    return (
        <>

            <div className="hidden md:flex justify-between p-2 rounded-lg shadow-sm bg-gradient-to-r from-[#ffffff] to-[#fdfffe] mb-8 gap-6 items-center">
                <h1 className="font-bold text-2xl">Dashboard</h1>
                <YearDropdown />
                <Search />
                <UserAndNotification />
            </div>
            

        </>
    );
};
export default DashboardNavbar
