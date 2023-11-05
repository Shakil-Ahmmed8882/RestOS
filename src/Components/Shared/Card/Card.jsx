import PropTypes from 'prop-types';

import details_icon from '../../../assets/img/details.gif'


export default function Card({ food }) {
  const {
    foodName,
    foodImage,
    foodCategory,
    price,
    quantity,

  } = food;

  return (<div className="card card-compact rounded-lg  bg-base-100 shadow-lg">
  <figure><img src={foodImage} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="font-semibold mb-1 text-[22px]">{foodName}</h2>
    <div className=" space-y-2 text-[#5e5e5e] text-[16px]  items-center">
    <p>category: {foodCategory}</p>
    <p>Price: ${price}</p>
    <p>Quantity: {quantity}</p>
    <p>Get RestOS new food collection and high qulity food with delicious flavour</p>

    </div>
    <div className="flex gap-2 items-center">
      <img className='w-5' src={details_icon} alt="" />
      <button className="text-primaryColor text-[17px] py-2">Details</button>
    </div>
  </div>
</div>)
}


Card.propTypes = {
      food: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        foodName: PropTypes.string.isRequired,
        foodImage: PropTypes.string.isRequired,
        foodCategory: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        orders: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        reviews: PropTypes.array.isRequired,
      }).isRequired,
    };