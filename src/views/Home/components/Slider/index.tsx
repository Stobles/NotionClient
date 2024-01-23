"use client";

import { RefAttributes, useEffect, useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide, useSwiper } from "swiper/react";
import { useMediaQuery } from "usehooks-ts";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { slides } from "./config/consts";
import Image from "next/image";

const Slider = () => {
  return (
    <div className="col-span-12 mb-28">
      <div className="pagination flex justify-center mt-2 md:mt-0 md:justify-between gap-1 md:gap-3 mb-4 flex-wrap md:flex-nowrap"></div>
      <div>
        <Swiper
          spaceBetween={30}
          effect={"fade"}
          navigation={true}
          loop={true}
          autoplay={{
            delay: 5000,
          }}
          pagination={{
            el: ".pagination",
            clickable: true,
            renderBullet: function (index, className) {
              const slide = slides[index];
              return `<div class='${className}'>
                        <div class='bullet__header'>
                          <img class='bullet__img' src='${
                            slide.bulletImg
                          }' alt='bullet_${index + 1}' />
                          <h4 class='bullet__title'>${slide.name}</h4>
                        </div>
                        <div class='bullet__description'>${slide.text}</div>

                      </div>`;
            },
          }}
          modules={[EffectFade, Navigation, Pagination]}
          className="swiper !w-full !max-h-[640px] shadow-slider rounded-xl border-1"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.name} className="h-full rounded-sm ">
              <Image
                width={1000}
                height={640}
                src={slide.img}
                alt={slide.name}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
