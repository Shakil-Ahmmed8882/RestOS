import { Link } from "react-router-dom";
import Loading from "../../../../Components/Shared/Loading";
import { useAuth } from "../../../../Utils/useAuthHelper";
import { useGetData } from "../../../../🔗Hook/httpRequests";
import { BsCurrencyDollar } from "react-icons/bs";

const AllPurchasedPage = () => {
  const { user } = useAuth();
  const { data, isLoading, refetch } = useGetData({
    endpoint: `all-purchased-list`,
    key: ["all-purchased-list"],
  });

  if (isLoading) return <Loading></Loading>;
  


  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 py-8 lg:grid-cols-3 gap-6">
      {data?.map((pFood) => {
        const {
          _id,
          foodName,
          status,
          foodImage,
          foodCategory,
          price,
          orders,
          quantity,
          made_by,
          food_origin,
          description,
          reviews,
          orderedDate,
          email,
        } = pFood;
        return (
          <div key={pFood._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="avatar mb-3">
                <div className="w-24 rounded-xl">
                  <img src={foodImage} />
                </div>
              </div>
              <h2 className="card-title text-[25px]">{foodName}</h2>
              <div className="text-[gray] text-[18px] my-1 mb-4">
              <p className="flex items-center"><BsCurrencyDollar/>{price}</p>
              <p>{orderedDate}</p>
              <p>Buyer: {email}</p>
              </div>
              <div className="card-actions justify-end">
                <Link to='/dashboard/user/orderlist'>
                  <button className="btn btn-primary">Orderlist </button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllPurchasedPage;
