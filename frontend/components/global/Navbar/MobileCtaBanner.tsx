import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import {Autoplay, Navigation} from 'swiper/modules'
import type {CtaBanner} from '@/types'

import LeftArrow from '@/svgs/LeftArrow'
import RightArrow from '@/svgs/RightArrow'

interface CtaBannerProps {
  navCta: CtaBanner
}

export default function MobileCtaBanner({navCta}: CtaBannerProps) {
  const {texts} = navCta || {}

  return (
    <>
      {navCta && (
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: '.custom-navigation-next',
            prevEl: '.custom-navigation-prev',
          }}
          modules={[Autoplay, Navigation]}
          className="mySwiper bg-primary text-white w-full h-full !py-4"
        >
          {texts?.map((text, index) => (
            <SwiperSlide key={index} className="!flex justify-center items-center text-xs">
              {text}
            </SwiperSlide>
          ))}

          <div className="custom-navigation-prev absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 p-2">
            <LeftArrow />
          </div>

          <div className="custom-navigation-next absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 p-2">
            <RightArrow />
          </div>
        </Swiper>
      )}
    </>
  )
}
