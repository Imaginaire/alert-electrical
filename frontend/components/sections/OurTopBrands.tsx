import urlForImage from '@/shared/utils/urlForImage'
import Image from 'next/image'

interface OurTopBrandsProps {
  images: {asset: {_ref: string}}[]
}

export default function OurTopBrands(data: OurTopBrandsProps) {
  const {images} = data
  return (
    <div className="m-auto border-b border-gray-200">
      <h2 className="text-center text-2xl lg:text-4xl font-bold my-12">OUR TOP BRANDS</h2>
      <ul className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-10 mb-12">
        {images.map((image, index) => (
          <li key={index} className="flex justify-center items-center self-center">
            <Image
              src={urlForImage(image.asset).url()}
              alt="Our Top Brands"
              width={100}
              height={100}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}