import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import Card from "../card";

const CardsSlider = ({ experiences }) => {
  return (
    <>
      <Swiper
        style={{
          "--swiper-pagination-color": "darkblue",
          marginLeft: "10px",
        }}
        spaceBetween={30}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2.3 },
          1024: { slidesPerView: 3.3 },
        }}
        pagination={{ clickable: true }}
        speed={600}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, Pagination]}
      >
        {experiences.map((experience, index) => (
          <SwiperSlide key={index}>
            <Card experience={experience} isClickable={true} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CardsSlider;
