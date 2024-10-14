import {Tab, TabGroup, TabList, TabPanel, TabPanels} from '@headlessui/react'
import ImageMagnifier from '../shared/ImageMagnifier'

interface ImageGalleryProps {
  productImages: {src: string}[]
}

export default function ImageGallery({productImages}: ImageGalleryProps) {
  return (
    <TabGroup className="grid grid-cols-6 gap-4">
      {/* Image selector */}
      <div className="mx-auto hidden w-3/4 max-w-2xl sm:block lg:max-w-none">
        <TabList className="flex flex-col gap-4">
          {productImages.map((image, index) => (
            <Tab
              key={index}
              className="group relative flex cursor-pointer items-center justify-center bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
            >
              <span className="inset-0 overflow-hidden ">
                {/* <ImageMagnifier src={'image.src'} width="200px" height="200px" alt={''} /> */}

                <img
                  alt=""
                  src={image.src}
                  className="h-full w-full object-cover object-center aspect-square"
                />
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 ring-2 ring-transparent ring-offset-2 group-data-[selected]:ring-indigo-500"
              />
            </Tab>
          ))}
        </TabList>
      </div>

      <TabPanels className="col-span-5">
        {productImages.map((image, index) => (
          <TabPanel key={index} className="aspect-square">
            <img
              alt={`product image ${index}`}
              src={image.src}
              className="h-full w-full object-cover object-center"
            />
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  )
}
