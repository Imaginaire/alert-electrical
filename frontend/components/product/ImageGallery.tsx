import {Tab, TabGroup, TabList, TabPanel, TabPanels} from '@headlessui/react'
import ImageMagnifier from '../shared/ImageMagnifier'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Pagination, EffectFade} from 'swiper/modules'
import {useState, useEffect} from 'react'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/css/effect-fade'

interface ImageGalleryProps {
  productImages: {src: string}[]
}

export default function ImageGallery({productImages}: ImageGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
  const [isFadingIn, setIsFadingIn] = useState<boolean>(true)

  const handleSlideChange = (index: number) => {
    setIsFadingIn(true)
    setActiveImageIndex(index)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsFadingIn(false)
    }, 150)

    return () => clearTimeout(timeout)
  }, [activeImageIndex])

  return (
    <>
      {/* Mobile */}
      <Swiper
        spaceBetween={16}
        centeredSlides={true}
        pagination={true}
        loop={true}
        navigation={{
          nextEl: '.custom-navigation-image-gallery-next',
          prevEl: '.custom-navigation-image-gallery-prev',
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper md:!hidden"
      >
        {productImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[520px] ">
              <Image src={image.src} fill alt={''} sizes="50vw" className="object-contain" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Desktop */}
      <TabGroup
        className="image-gallery hidden md:flex flex-col xl:flex-row-reverse xl:h-[555px] h-full"
        onChange={(index) => handleSlideChange(index)}
      >
        <TabPanels className="h-full p-2 pt-0 xl:pt-2 xl:pr-0 flex-[5]">
          {productImages.map((image, index) => (
            <TabPanel key={index} className="aspect-square">
              <ImageMagnifier
                src={image.src}
                width="200px"
                height="200px"
                alt=""
                classes={`transition-opacity duration-300 ${isFadingIn && activeImageIndex === index ? 'opacity-0' : 'opacity-100'}`}
              />
            </TabPanel>
          ))}
        </TabPanels>
        <TabList className="flex xl:flex-col overflow-x-auto xl:overflow-x-visible xl:overflow-y-auto gap-4 p-2 xl:pl-2 xl:pl-0 flex-[1]">
          {productImages.map((image, index) => (
            <Tab
              key={index}
              className="group flex cursor-pointer items-center justify-center bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4 w-[calc(20%-13px)] xl:w-auto xl:h-[calc(473.34px*20%-13px)] shrink-0"
            >
              <span className="inset-0 overflow-hidden">
                <img
                  alt=""
                  src={image.src}
                  className="h-full w-full object-cover object-center aspect-square"
                />
              </span>
            </Tab>
          ))}
        </TabList>
      </TabGroup>
    </>
  )
}
