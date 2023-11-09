import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./slider.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Slider() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}


        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper">
        <SwiperSlide  className="w-11">
          <img 
            src="https://themealdb.com/images/ingredients/Lime.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide  className="w-11">
          <img 
            src="https://themealdb.com/images/ingredients/Chicken.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide  className="w-11">
          <img 
            src="https://themealdb.com/images/ingredients/Raspberries.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide  className="w-11">
          <img 
            src="https://themealdb.com/images/ingredients/Turmeric.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide  className="w-11">
          <img 
            src="https://themealdb.com/images/ingredients/Smoked%20Haddock.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide  className="w-11">
          <img 
            src="https://themealdb.com/images/ingredients/Red%20Chilli.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide  className="w-11">
          <img 
            src="https://themealdb.com/images/ingredients/Lettuce.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide  className="w-11">
          <img 
            src="https://themealdb.com/images/ingredients/Egg%20Yolks.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide  className="w-11">
          <img 
            src="https://themealdb.com/images/ingredients/Turmeric.png"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
