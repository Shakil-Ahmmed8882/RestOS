import PropTypes from 'prop-types';

import details_icon from '../../../assets/img/details.gif'
import { useTheme } from 'next-themes';
import darkDetail from '../../../assets/img/darkDetail.gif'


export default function Card({ food }) {
      const {theme} = useTheme()
  const {
    foodName,
    foodImage,
    foodCategory,
    price,
    quantity,

  } = food;

  return (<div className={`card card-compact rounded-lg shadow-lg`}>
  <figure><img src={foodImage} alt="Shoes" /></figure>
  <div className={`${theme == "dark"?"bg-[#262526aa]":''} card-body`}>
    <h2 className={`font-semibold mb-1 text-[22px] ${theme == 'dark'?'text-[#4bd6fdc0]':''} pt-3`}>{foodName}</h2>
    <div className={` space-y-2  text-[16px]  items-center ${theme == 'dark'?'text-[#c6c5c5]':'text-[#5e5e5e]'}`}>
    <p>category: {foodCategory}</p>
    <p>Price: ${price}</p>
    <p>Quantity: {quantity}</p>
    <p>Get RestOS new food collection and high qulity food with delicious flavour</p>

    </div>
    <div className="flex gap-2 items-center">
      {
            theme == 'dark'? 
            <img className='w-5' src={darkDetail} alt="" />:
            <img className='w-5' src={details_icon} alt="" />

      }
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