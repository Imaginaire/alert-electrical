import {ShopPageProduct} from '@/types/productType'
import Link from 'next/link'
import Image from 'next/image'
import urlForImage from '@/shared/utils/urlForImage'

interface ProductCardProps {
  product: ShopPageProduct
  isLastTwoProducts: boolean
}

export default function ProductCard({product, isLastTwoProducts}: ProductCardProps) {
  const {title, featuredImage, priceRange, brand, id, slug, compareAtPriceRange} = product || {}

  return (
    <div>
      <Link
        href={`/product/${slug}` || '/'}
        className={`${isLastTwoProducts ? 'hidden md:block' : ''}`}
      >
        <div className="relative w-full h-[265px]">
          <Image
            src={featuredImage?.url || ''}
            alt={title || ''}
            fill
            sizes="25vw"
            style={{objectFit: 'contain'}}
          />
          {Number(compareAtPriceRange?.maxVariantPrice?.amount) > 0 && (
            <span className="absolute top-2 right-2  w-[40px] h-[20px] text-red-900 bg-white">
              SALE
            </span>
          )}
        </div>
        <div className="my-2 text-xl self-stretch flex flex-col md:flex-row justify-between items-baseline flex-wrap">
          <span className="mb-2 md:mb-0 text-secondary text-sm uppercase">{brand?.value}</span>
          <div>
            <span
              className={
                Number(compareAtPriceRange?.maxVariantPrice?.amount) > 0
                  ? 'text-sm text-secondary mr-3 line-through'
                  : 'text-primary'
              }
            >
              £{Number(priceRange?.maxVariantPrice?.amount).toFixed(2)}
            </span>
            <span>
              {Number(compareAtPriceRange?.maxVariantPrice?.amount) > 0
                ? `£${Number(compareAtPriceRange?.maxVariantPrice?.amount).toFixed(2)}`
                : null}
            </span>
          </div>
        </div>
        <h2 className="text-xl text-primary">{title}</h2>
      </Link>
    </div>
  )
}
