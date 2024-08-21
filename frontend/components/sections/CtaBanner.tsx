import {Swiper, SwiperSlide} from 'swiper/react'
// import 'swiper/css'
// import 'swiper/css/pagination'
// import 'swiper/css/navigation'
import {Autoplay, Navigation} from 'swiper/modules'
import {CtaBanner} from '@/types'

export default function CallToActionBanner({leftText, middleText, rightText}: CtaBanner) {
  return (
    <>
      {leftText && middleText && rightText && (
        <>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>{leftText}</SwiperSlide>
            <SwiperSlide>{middleText}</SwiperSlide>
            <SwiperSlide>{rightText}</SwiperSlide>
          </Swiper>
        </>
      )}
    </>
  )
}
