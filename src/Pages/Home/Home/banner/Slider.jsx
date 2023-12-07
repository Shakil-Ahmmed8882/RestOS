import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./slider.css";
import slider1 from "../../../../assets/img/slider1-removebg-preview.png"
import slider2 from "../../../../assets/img/slider2-removebg-preview.png"
import slider3 from "../../../../assets/img/slider3-removebg-preview.png"

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useTheme } from "next-themes";

export default function Slider() {
  const {theme} = useTheme()
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
        className={`mySwiper ${theme == 'dark'?'swiper-dark':''}`}>
          <SwiperSlide  className="w-20 rounded-full">
            <img 
            className="w-20 rounded-full h-16 "
              src="https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide  className="w-20 rounded-full">
            <img 
            className="w-20 rounded-full h-16 "
              src="https://images.pexels.com/photos/707251/pexels-photo-707251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide  className="w-20 rounded-full">
            <img 
            className="w-20 rounded-full h-16 "
              src="https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide  className="w-20">
          <img 
            src={slider2}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide  className="w-20 rounded-full">
          <img 
          className="w-20 rounded-full h-16 "
            src={slider1}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide  className="w-20">
          <img 
            src={slider3}
            alt=""
          />
        </SwiperSlide>
       
      </Swiper>
    </>
  );
}
