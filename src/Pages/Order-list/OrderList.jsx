import Spinner from "../../Components/Shared/Spinner/Spinner";
import { useGetData } from "../../🔗Hook/httpRequests";


const OrderList = () => {
      const {data,isLoading,refetch} = useGetData({endpoint:'ordered-list',key:'/ordered-list'})

      if(isLoading) return <Spinner></Spinner>

      return (
            <div>
              <h1>my order list <span className="text-7xl font-bold">{data.length}</span></h1>    
              <button className="btn bg-primaryColor">Delete</button>
            </div>
      );
};

export default OrderList;