import {ShopPageProduct} from '@/types/productType'
import Link from 'next/link'
import Image from 'next/image'
import urlForImage from '@/shared/utils/urlForImage'

interface ProductCardProps {
  product: ShopPageProduct
}

export default function ProductCard({product}: ProductCardProps) {
  const {title, featuredImage, priceRange, brand, id, slug} = product || {}

  return (
    <div>
      <Link href={`product/${slug}` || '/'}>
        <div className="relative w-full h-[265px]">
          <Image
            src={featuredImage?.url || ''}
            alt={title || ''}
            fill
            sizes="100vw"
            style={{objectFit: 'contain'}}
          />
        </div>
        <div className="my-2 text-xl self-stretch flex flex-col md:flex-row justify-between items-baseline">
          <span className="mb-2 md:mb-0 text-secondary text-sm uppercase">{brand?.value}</span>
          <span className="text-primary">£{priceRange?.maxVariantPrice?.amount}</span>
        </div>
        <h2 className="text-xl text-primary">{title}</h2>
      </Link>
    </div>
  )
}
