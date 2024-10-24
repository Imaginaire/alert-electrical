import {useEffect, useState} from 'react'
import Image from 'next/image'
import PageHead from '@/components/pages/PageHead'
import Layout from '@/components/global/Layout'
import Sections from '@/components/global/Sections'
import DropDowns from '@/components/shared/Dropdowns'
import Breadcrumbs from '@/components/global/Breadcrumbs'
import CartBanner from '@/components/product/CartBanner'
import LargeCta from '@/components/sections/LargeCta'
import {useCart} from '@/contexts/CartContext'
import {MinusIcon, PlusIcon} from '@heroicons/react/24/outline'
import {fetchStaticPaths} from '@/shared/utils/productPageSlugUtils/staticPathsUtil'
import {fetchStaticProps} from '@/shared/utils/productPageSlugUtils/staticPropsUtil'
import {ProductPageProps} from '@/components/pages/ProductPage'
import RecommendedProducts from '@/components/sections/RecommendedProducts'
import {useBreadcrumbs} from '@/contexts/BreadcrumbContext'
import {useRouter} from 'next/router'
import ImageGallery from '@/components/product/ImageGallery'
import ImageMagnifier from '@/components/shared/ImageMagnifier'

// Render product details
export default function ProductPage({
  product,
  settings,
  homePageTitle,
  productSetting,
}: ProductPageProps) {
  const {warranty, delivery, cta, masterRobots, productSpecificRobots} = productSetting || {}

  const [isAddToCartClicked, setIsAddToCartClicked] = useState(false)
  useEffect(() => {
    if (isAddToCartClicked) {
      setIsAddToCartClicked(false)
    }
  }, [product?.id])

  const {
    title,
    descriptionHtml,
    featuredImage,
    images,
    priceRange,
    compareAtPriceRange,
    height,
    sizeDiameter,
    cutOutDiameter,
    electricalClass,
    ipRating,
    numberOfLamps,
    lampsSupplied,
    lumens,
    colourTemperature,
    integratedSwtich,
    dimmable,
    wattage,
    brand,
    finish,
    range,
    width,
    projection,
    seo,
    id,
    variants,
    collections,
  } = product || {}

  const variantId = variants?.edges[0].node.id
  const SKU = variants?.edges[0].node.sku
  const productCollections = collections?.edges.map(
    (collection: {node: {title: string}}) => collection.node.title,
  )

  const aboutProductArray = [
    {label: 'Brand', value: brand?.value},
    {label: 'Finish', value: finish?.value},
    {label: 'Range', value: range?.value},
  ]

  const sizeInfoArray = [
    {label: 'Height', value: height?.value},
    {label: 'Diameter', value: sizeDiameter?.value},
    {label: 'Cut Out Diameter', value: cutOutDiameter?.value},
    {label: 'Width', value: width?.value},
    {label: 'Projection', value: projection?.value},
  ]

  const specsArray = [
    {label: 'Electrical Class', value: electricalClass?.value},
    {label: 'IP Rating', value: ipRating?.value},
    {label: 'No of Lamps', value: numberOfLamps?.value},
    {label: 'Lamps Supplied', value: lampsSupplied?.value},
    {label: 'Lumens', value: lumens?.value},
    {label: 'Colour Temperature', value: colourTemperature?.value},
    {label: 'Integrated Switch', value: integratedSwtich?.value},
    {label: 'Dimmable', value: dimmable?.value},
    {label: 'Wattage', value: wattage?.value},
  ]

  const details = [
    {name: 'About the product', items: [{value: aboutProductArray}]},
    {
      name: 'Sizing & technical information',
      items: [
        {title: 'Sizing', value: sizeInfoArray},
        {title: 'Technical Information', value: specsArray},
      ],
    },
    {name: 'delivery information', items: delivery ? [delivery] : []},
    {name: 'warranty', items: [warranty ?? '']},
    {name: 'Categories', items: productCollections ? productCollections : []},
  ]

  console.log('###productCollections', productCollections)

  const productImages = images?.edges.map((image: {node: {url: string}}) => ({
    src: image.node.url,
  }))

  const [quantity, setQuantity] = useState<number>(1)

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuantity(Number(e.target.value))

  // cart context
  const {addToCart} = useCart()

  const {breadcrumbs, setBreadcrumbsFromUrl} = useBreadcrumbs()
  const router = useRouter()

  useEffect(() => {
    setBreadcrumbsFromUrl(router.asPath)
  }, [router])

  const handleAddToCart = () => {
    const variant = {
      id: variantId,
      title,
      quantity,
      featuredImage: featuredImage?.url,
      price: priceRange?.maxVariantPrice?.amount,
      store: {
        id: variantId,
      },
    }

    addToCart(variant)
    setIsAddToCartClicked(true)
  }

  // show cart banner for 5 seconds
  useEffect(() => {
    if (isAddToCartClicked) {
      setTimeout(() => {
        setIsAddToCartClicked(false)
      }, 5000)
    }
  }, [isAddToCartClicked])

  return (
    <>
      <PageHead
        productSeo={seo ? {...seo, description: seo.metaDescription} : undefined}
        fallbackRobots={masterRobots}
        productSpecificRobots={productSpecificRobots}
        canonicalUrl={`/product/${title}`}
        title={title}
      />
      <Layout settings={settings}>
        {isAddToCartClicked && <CartBanner title={title ?? ''} quantity={quantity} />}
        <div className="productPage w-full">
          <div className="flex justify-between text-primary font-manrope p-7">
            <Breadcrumbs pages={breadcrumbs} />
          </div>
          <div
            className={`productPage-container mx-auto max-w-2xl lg:max-w-screen-2xl ${brand?.value ? '' : 'pb-16'}`}
          >
            <div className="lg:grid lg:grid-cols-2 lg:px-8 lg:items-start lg:gap-x-8">
              {/* Image */}
              <div className="relative lg:top-10 w-full">
                {productImages && productImages.length > 1 ? (
                  <ImageGallery productImages={productImages} />
                ) : (
                  <div className="flex justify-center items-center">
                    <ImageMagnifier
                      src={featuredImage?.url || ''}
                      width="w-auto"
                      height="h-[500px]"
                      alt=""
                      containerClasses="hidden md:flex"
                    />
                    <div className="relative w-full h-[500px] md:hidden">
                      <Image
                        src={featuredImage?.url || ''}
                        fill
                        alt={''}
                        sizes="50vw"
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}

                {Number(compareAtPriceRange?.maxVariantPrice?.amount) > 0 && (
                  <span className="absolute top-2 right-2 w-[40px] h-[20px] text-red-900 bg-white z-50">
                    SALE
                  </span>
                )}
              </div>

              {/* Product info */}
              <div>
                <div className="px-5 mt-6">
                  <div className="px-4 sm:px-0 lg:mt-0">
                    <h1 className="text-3xl font-normal text-primary text-center">{title}</h1>
                    <div className="flex flex-col items-center">
                      <p className="mt-6 mb-2 lg:mb-0 text-2xl text-center text-secondary">
                        <span
                          className={
                            Number(compareAtPriceRange?.maxVariantPrice?.amount) > 0
                              ? 'text-sm text-secondary mr-3 line-through'
                              : 'text-primary'
                          }
                        >
                          £{Number(priceRange?.maxVariantPrice?.amount).toFixed(2)}
                        </span>
                        <span className="text-primary">
                          {Number(compareAtPriceRange?.maxVariantPrice?.amount) > 0
                            ? `£${Number(compareAtPriceRange?.maxVariantPrice?.amount).toFixed(2)}`
                            : null}
                        </span>
                      </p>
                      {SKU && <span className="text-xs text-secondary mb-4">SKU: {SKU}</span>}
                      {/* <ul className="inline p-0 m-0 list-none text-center text-sm text-primary mb-4 lg:mb-0">
                        <span className="mr-2">Categories:</span>
                        {productCollections &&
                          productCollections
                            .filter((collection) => collection !== 'All Products')
                            .map((collection, index) => {
                              const isLastItem =
                                index ===
                                productCollections.filter((c) => c !== 'All Products').length - 1
                              return (
                                <li
                                  key={index}
                                  className="inline transition-colors duration-300  hover:text-blue-400"
                                >
                                  <Link
                                    href={`/product-category/${formatCollectionValue(collection)}`}
                                  >
                                    {collection}
                                  </Link>
                                  {!isLastItem && ', '}
                                </li>
                              )
                            })}
                      </ul> */}
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-col-reverse items-center">
                    {/* Quantity & Add to Cart */}
                    <div className="flex justify-center items-center gap-2 lg:mb-7 w-full lg:w-4/5">
                      <div className="max-w-[8rem] relative flex items-center border">
                        <button
                          type="button"
                          className="hover:bg-gray-100 border-gray-300 p-3 h-[50px] focus:outline-none"
                          onClick={() => {
                            if (quantity > 1) {
                              setQuantity((prev) => prev - 1)
                            }
                          }}
                        >
                          <MinusIcon className="w-3 h-3 text-primary" />
                        </button>
                        <input
                          type="text"
                          className="h-11 text-center text-base text-primary block w-full py-2.5"
                          value={quantity}
                          onChange={handleQuantityChange}
                          required
                        />
                        <button
                          type="button"
                          className="hover:bg-gray-100 border-gray-300 p-3 h-[50px] focus:outline-none"
                          onClick={() => setQuantity((prev) => prev + 1)}
                        >
                          <PlusIcon className="w-3 h-3 text-primary" />
                        </button>
                      </div>

                      <button
                        type="submit"
                        className="flex w-full items-center justify-center bg-primary px-8 py-3 text-base font-normal text-white text-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 uppercase"
                        onClick={handleAddToCart}
                      >
                        Add to cart
                      </button>
                    </div>

                    <div>
                      {/* Description */}
                      <div
                        className="my-6 lg:my-3 leading-[26px] font-manrope text-center"
                        dangerouslySetInnerHTML={{__html: descriptionHtml ?? ''}}
                      />
                    </div>
                  </div>
                </div>

                {/* Additional details */}
                {details && <DropDowns data={details} />}
              </div>
            </div>
          </div>

          {brand?.value && <RecommendedProducts productId={id || ''} brand={brand?.value || ''} />}

          {/* Large CTA */}
          {cta && <LargeCta {...cta} />}
        </div>
      </Layout>
    </>
  )
}

// Shopify product fetching by slug (handle)
export const getStaticProps = fetchStaticProps

// Use Shopify to generate static paths for all products
export const getStaticPaths = async () => {
  const paths = await fetchStaticPaths()
  return {
    paths,
    fallback: 'blocking',
  }
}
