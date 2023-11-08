import Spinner from "../../Components/Shared/Spinner/Spinner";
import { useAuth } from "../../Utils/useAuthHelper";
import { useGetData } from "../../🔗Hook/httpRequests";
import { useAxios } from "../../🔗Hook/useAxios";


const OrderList = () => {
      
      const xios = useAxios()
      const {user,loading} = useAuth()
      const {data,isLoading,refetch} = useGetData({endpoint:`ordered-list?email=${user?.email}`,key:'/ordered-list'})

      if(loading) return


      if(isLoading) return <Spinner></Spinner>


      // delete the ordered food
      const handleOrderedFood = async(_id) => {
            const res = await xios.delete(`/cancel-ordered-food/${_id}`)
            if(res.deletedCount > 0){
                  refetch()
            }
            
      }



      return (
            <div>
              <h1>my order list <span className="text-7xl font-bold">{data.length}</span></h1>    
              <button onClick={handleOrderedFood} className="btn bg-primaryColor">Delete</button>
            </div>
      );
};

export default OrderList;