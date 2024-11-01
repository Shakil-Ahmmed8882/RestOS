import React from "react";
import { FaHamburger, FaPizzaSlice, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { BsFillCircleFill } from "react-icons/bs";
import { useAuth } from "../../../../../Utils/useAuthHelper";
import { UserAvater } from "../../../../../assets/icons/Icons";
import card from "../../../../../assets/img/card.png";

export default function RestaurantSidebar() {
  const { user } = useAuth();

  const nearbyRestaurants = [
    {
      name: "The Burger Place",
      cuisine: "American, Fast Food",
      rating: 4.5,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNBIgkiq0lnMyMjNxLXdhyOZdqQHoqsOTdVQ&s"
    },
    {
      name: "Pizza Corner",
      cuisine: "Italian, Pizza",
      rating: 4.7,
      image: "https://content3.jdmagicbox.com/comp/kaimur/c9/9999p6189.6189.221123142535.u9c9/catalogue/five-star-restaurant-bhabua-bhabua-restaurants-c3tuafx01z.jpg"
    },
    {
      name: "Sushi World",
      cuisine: "Japanese, Sushi",
      rating: 4.3,
      image: "https://static.citylifestyle.com/articles/phillys-the-place-for-five-starr-restaurants/Starr%20Fronts-1-1135.jpg?v=1"
    }
    // Add more restaurants here if needed
  ];


  return (
    <div className="p-4 w-full rounded-lg shadow-lg space-y-6">
      {/* User Profile Section */}
      <div className="flex items-center space-x-3">
        <UserAvater />
        <div>
          <p className="text-lg font-semibold text-blue-gray-700">{user?.displayName}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      {/* Credit Card Section */}
      <div className="relative mt-11 ">
        <div className="w-full h-full bg-gradient-to-l from-primaryColor text-[#fff] to-[#fff] absolute"></div>
        <div className="bg-[#fffffff9] drop-shadow-lg relative rotate-3 p-4 rounded-lg text-white">
          <p className="text-lg font-bold">ADRBank</p>
          <img className="size-8 absolute right-3 top-3" src={card} alt="" />
          <p className="font-semibold mt-2">8763 2736 9873 0329</p>
          <p className="text-sm mt-2 text-[#919191]">Cardholder Name: Hillery Nevelin</p>
          <p className="text-sm text-[#919191] mt-3">Expired Date: 10/28</p>
          <div className="flex justify-end mt-2">
            <BsFillCircleFill className="text-deepPink mr-1" />
            <BsFillCircleFill className="text-[#b7b7b7]" />
          </div>
        </div>
      </div>

      {/* Map and Order Status */}
      <div>
        <p className="text-lg font-semibold mt-11 text-[#989797]">My Order</p>
        <div className="mt-2 bg-white rounded-lg shadow">
          <img
            src="https://media.maptiler.com/img/search_map_7b08774e32.webp"
            alt="Delivery Map"
            className="rounded-lg w-full h-[150px] object-cover"
          />
        </div>
      </div>

      {/* Delivery Information */}
      <div className="flex items-center space-x-3 mt-4">
        <img
          src="https://img.freepik.com/free-photo/portrait-delivery-man-handing-out-parcel_23-2149561208.jpg"
          alt="Delivery Person"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <p className="text-blue-gray-700 font-medium">Robert Fox</p>
          <p className="text-sm text-gray-500">My Deliverer</p>
        </div>
      </div>
      <div className="flex items-center mt-2">
        <FaMapMarkerAlt className="text-deepPink mr-2" />
        <p className="text-sm text-gray-600">
          My Delivery Time: <strong>30-40 mins</strong>
        </p>
      </div>

      {/* Nearby Restaurants Section */}
      {/* Nearby Restaurants Section */}
      <div>
        <p className="text-lg font-semibold mt-11 text-[#989797]">Nearby Restaurants</p>
        <div className="space-y-4 mt-6">
          {nearbyRestaurants.map((restaurant, index) => (
            <div
              key={index}
              className="flex  space-x-3 bg-white  rounded-lg shadow hover:bg-gray-100 transition"
            >
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1 gap-3">
                <p className="font-semibold text-blue-gray-700">{restaurant.name}</p>
                <p className="text-sm text-description-text my-1">{restaurant.cuisine}</p>
                <div className="flex items-center text-yellow-500 text-sm">
                  <FaStar className="text-secondaryColor mr-1" /> <span className="text-description-text">{restaurant.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
