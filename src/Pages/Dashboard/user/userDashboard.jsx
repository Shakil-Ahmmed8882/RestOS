import DashboardNavbar from "../navabar/DashboardNavbar";
import PurchaseChart from "./PurchaseChart";
import OrderChart from "./OrderChart";
import SidebarOrderlist from "./SidebarOrderlist";
import Banner from "./Banner";


const UserDashboard = () => {

  return (
    <div>
      {/* navbar */}
      <DashboardNavbar />
      <div className="relative">

      <Banner/>
        {/* chart view */}
        <div className=" md:grid lg:grid md:grid-cols-2 lg:grid-cols-8 gap-3 w-full">
          <OrderChart />
          <PurchaseChart />
          <SidebarOrderlist />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;