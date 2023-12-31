'use client'
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image'


function HeroCarousel() {

    const imgList = [
      { src: "/assets/images/hero-4.svg", alt: "hero-1" },
      { src: "/assets/images/hero-2.svg", alt: "hero-2" },
      { src: "/assets/images/hero-3.svg", alt: "hero-3" },
      { src: "/assets/images/hero-1.svg", alt: "hero-4" },
      { src: "/assets/images/hero-5.svg", alt: "hero-5" },
    ]; 

  return (
    <div className="hero-carousel md:mt-16 ">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
        className=" md:border-2 md:border-gray-300 md:hover:border-[#eb4444] rounded-3xl"
      >
        {imgList.map((item, index) => (
          <div key={index}>
            <Image
              src={item.src}
              alt={item.alt}
              width={484}
              height={484}
              className="object-contain p-4"
            />
          </div>
        ))}
      </Carousel>
      <Image
        src="/assets/icons/hand-drawn-arrow.svg"
        alt="arrow"
        width={175}
        height={175}
        className="max-xl:hidden absolute -left-[15%] bottom-0 z-0"
      />
    </div>
  );
}

export default HeroCarousel