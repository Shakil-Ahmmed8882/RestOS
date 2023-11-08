
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './slider.css';

// import required modules
import { Pagination } from 'swiper/modules';

export default function Slider() {
  return (
    <>
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide><img className='w-32 h-32' src="https://www.themealdb.com/images/category/lamb.png

" alt="" /></SwiperSlide>
        <SwiperSlide><img className='w-32 h-32' src="https://www.themealdb.com/images/category/miscellaneous.png

" alt="" /></SwiperSlide>
        <SwiperSlide><img className='w-32 h-32' src="https://www.themealdb.com/images/category/pasta.png

" alt="" /></SwiperSlide>
        <SwiperSlide><img className='w-32 h-32' src="https://www.themealdb.com/images/category/pork.png

" alt="" /></SwiperSlide>
        <SwiperSlide><img className='w-32 h-32' src="https://www.themealdb.com/images/category/seafood.png

" alt="" /></SwiperSlide>
        <SwiperSlide><img className='w-32 h-32' src="https://www.themealdb.com/images/category/side.png

" alt="" /></SwiperSlide>
        <SwiperSlide><img className='w-32 h-32' src="https://www.themealdb.com/images/category/vegetarian.png

" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://www.themealdb.com/images/category/breakfast.png

" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://www.themealdb.com/images/category/goat.png

" alt="" /></SwiperSlide>
      </Swiper>
    </>
  );
}
