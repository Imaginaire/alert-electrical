import {Product} from '@/types/productType'
import Link from 'next/link'
import Image from 'next/image'
import urlForImage from '@/shared/utils/urlForImage'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({product}: ProductCardProps) {
  const {title, previewImageUrl, priceRange, slug} = product.store || {}

  return (
    <div>
      <Link href={slug?.current || '/'}>
        {/* <div className="relative w-full h-[265px]">
          <Image
            src={urlForImage(previewImageUrl)?.width(1920).url()}
            alt={title || ''}
            fill
            sizes="100vw"
          />
        </div> */}
        <img src={previewImageUrl} alt={title} className="w-full aspect-square object-contain" />
        <div className="my-2 text-xl self-stretch flex flex-col md:flex-row justify-between items-baseline">
          <span className="mb-2 md:mb-0 text-secondary text-sm uppercase">placeholder</span>
          <span className="text-primary">£{priceRange?.maxVariantPrice?.toFixed(2)}</span>
        </div>
        <h2 className="text-xl text-primary">{title}</h2>
      </Link>
    </div>
  )
}
