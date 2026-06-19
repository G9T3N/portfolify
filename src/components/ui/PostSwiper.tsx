"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css/effect-cards";
import "swiper/css";
import { cn } from "@/lib/utils";

interface PostSwiperProps {
  slides: React.ReactNode[];
  className?: string;
  swiperClassName?: string;
  loop?: boolean;
  grabCursor?: boolean;
}

const PostSwiper = ({
  slides,
  className,
  swiperClassName,
  loop = true,
  grabCursor = true,
}: PostSwiperProps) => {
  return (
    <div className={cn("w-full flex flex-col items-center justify-center", className)}>
      <Swiper
        effect="cards"
        grabCursor={grabCursor}
        loop={loop}
        className={cn("w-full  h-auto", swiperClassName)}
        modules={[EffectCards]}
        cardsEffect={{
          slideShadows: false,
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="!flex !items-start w-full !justify-center bg-transparent">
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PostSwiper;

