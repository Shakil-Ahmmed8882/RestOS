import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./slider.css";
import slider1 from "../../../../assets/img/slider1-removebg-preview.png";
import slider2 from "../../../../assets/img/slider2-removebg-preview.png";
import slider3 from "../../../../assets/img/slider3-removebg-preview.png";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useTheme } from "next-themes";

export default function Slider() {
  const { theme } = useTheme();
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
        className={`mySwiper ${theme == "dark" ? "swiper-dark" : ""}`}
      >
        <SwiperSlide className="  rounded-full">
          <img
            className="rounded-full object-cover "
            src="https://images.pexels.com/photos/3896066/pexels-photo-3896066.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide className="  rounded-full">
          <img
            className=" rounded-full  object-cover "
            src="https://images.pexe ls.com/photos/707251/pexels-photo-707251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide className="  rounded-full">
          <img
            className=" rounded-full  object-cover "
            src="https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide className=" ">
          <img className="rounded-full object-cover" src={slider2} alt="" />
        </SwiperSlide>
        <SwiperSlide className=" rounded-full object-cover">
          <img
            className=" rounded-full"
            src="https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
