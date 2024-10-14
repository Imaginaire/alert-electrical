import {Tab, TabGroup, TabList, TabPanel, TabPanels} from '@headlessui/react'
import ImageMagnifier from '../shared/ImageMagnifier'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Pagination, FreeMode, Thumbs} from 'swiper/modules'
import {useState} from 'react'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

interface ImageGalleryProps {
  productImages: {src: string}[]
}

export default function ImageGallery({productImages}: ImageGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  return (
    <>
      {/* Mobile */}
      <Swiper
        spaceBetween={16}
        centeredSlides={true}
        pagination={true}
        loop={true}
        navigation={{
          nextEl: '.custom-navigation-next',
          prevEl: '.custom-navigation-prev',
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper md:!hidden"
      >
        {productImages.map((image, index) => (
          <SwiperSlide key={index}>
            <ImageMagnifier src={image.src} width="full" height="full" alt={''} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Desktop */}
      <TabGroup className="image-gallery hidden md:flex flex-col h-full">
        <TabPanels className="h-full p-2 pt-0">
          {productImages.map((image, index) => (
            <TabPanel key={index} className="aspect-square">
              <ImageMagnifier src={image.src} width="200px" height="200px" alt={''} />
            </TabPanel>
          ))}
        </TabPanels>
        <TabList className="flex overflow-x-auto gap-4 p-2 pb-0">
          {productImages.map((image, index) => (
            <Tab
              key={index}
              className="group flex cursor-pointer items-center justify-center bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4 w-[calc(20%-13px)] shrink-0"
            >
              <span className="inset-0 overflow-hidden ">
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
