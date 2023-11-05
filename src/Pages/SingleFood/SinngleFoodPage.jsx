import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetData } from "../../🔗Hook/httpRequests";
import Spinner from "../../Components/Shared/Spinner/Spinner";

const SingleFoodPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetData({
    endpoint: `food/${id}`,
    key: "food",
  });
  const goTo = useNavigate();

  if (isLoading) return <Spinner />;

  //   const {
  //     _id, foodName, foodImage, foodCategory, price, orders, quantity, made_by, food_origin, description, reviews,
  //   } = data;

  return (
    <div>
      <h1 className="text-7xl font-bold">Single food page</h1>

      <button onClick={() => goTo("/order-food")} className="btn btn-primary">
        Order Now
      </button>
    </div>
  );
};

SingleFoodPage.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default SingleFoodPage;
