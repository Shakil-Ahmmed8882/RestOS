import Spinner from "../../Components/Shared/Spinner/Spinner";
import { useAuth } from "../../Utils/useAuthHelper";
import { useGetData } from "../../🔗Hook/httpRequests";


const Added_Food = () => {
      const {user} = useAuth()
      const {data,isLoading} = useGetData({endpoint:`added-food?email=${user?.email}`,key:'added-food'})
      // console.log(data)
      
      if(isLoading) return <Spinner></Spinner>


      return (
            <div className="relative">
                <h1 className="text-7xl font-bold">Added food</h1>
                <div className="flex gap-3 flex-wrap justify-center">
                  {
                        data?.map(food => <div key={food._id} className="card card-compact w-96 bg-base-100 shadow-xl">
                        <figure><img src={food.img} alt="Shoes" /></figure>
                        <div className="card-body">
                          <h2 className="card-title">{food.name}</h2>
                          <p>{food.description}</p>
                          <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                          </div>
                        </div>
                      </div>)
                  }

                </div>
            </div>
      );
};

export default Added_Food;