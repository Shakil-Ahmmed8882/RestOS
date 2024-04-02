import { Searchbar } from "../Shared/Searchbar/Searchbar";

export const DashboardNavbar = () => {
  return (
    <div className="bg-white rounded-t-md border border-[#eeeeee] p-2 flex  items-center justify-between">
        <h2 className="font-bold text-gray-600 font-title">Products</h2>
        <Searchbar/>
    </div>
  );
};
