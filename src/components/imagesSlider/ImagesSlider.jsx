import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import styles from "./index.module.scss";

const ImagesSlider = ({ pictures }) => {
  return (
    <>
      <Swiper
        style={{
          "--swiper-pagination-color": "darkblue",
          margin: "0",
        }}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        speed={600}
        loop={true}
        modules={[Pagination]}
      >
        {pictures.map((picture, i) => (
          <SwiperSlide key={i}>
            <div className={styles.cardBoxImage}>
              <Image
                src={picture}
                alt="image experience"
                width={1200}
                height={1200}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ImagesSlider;
