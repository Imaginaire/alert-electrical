import {useState} from 'react'
import Image from 'next/image'

import PageHead from './PageHead'
import Layout from '@/components/global/Layout'
import Sections from '@/components/global/Sections'
import {ProductPageProduct} from '@/types/productType'
import {FilterItems, PagePayload, ProductSettingPayload, SettingsPayload} from '@/types'
import {MinusIcon, PlusIcon} from '@heroicons/react/24/outline'
import {useCart} from '@/contexts/CartContext'
import CartBanner from '../product/CartBanner'
import LargeCta from '../sections/LargeCta'
import DropDowns from '../shared/Dropdowns'
import Breadcrumbs from '../global/Breadcrumbs'

export interface ProductPageProps {
  page: PagePayload | undefined
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  preview?: boolean
  loading?: boolean
  canonicalUrl?: string
  addToCartText?: string
  productSetting?: ProductSettingPayload
  product?: ProductPageProduct
  filterItems?: FilterItems
}

export default function ProductPage({
  page,
  preview,
  settings,
  homePageTitle,
  loading,
  canonicalUrl,
  productSetting,
  product,
}: ProductPageProps) {
  const {sections} = page || {}
  const {warranty, delivery, cta} = productSetting || {}
  const [isAddToCartClicked, setIsAddToCartClicked] = useState(false)

  const {
    title,
    descriptionHtml,
    featuredImage,
    priceRange,
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
  } = product || {}

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

  console.log({product})

  const [quantity, setQuantity] = useState<number>(1)

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuantity(Number(e.target.value))

  // cart context
  const {addToCart, updateQuantity} = useCart()

  // const handleAddToCart = () => {
  //   // add to local storage while user is browsing
  //   const cart = JSON.parse(localStorage.getItem('cart') || '[]') as Variant[]

  //   // check if cart already has the item, if so, update the quantity
  //   const existingItem = cart.find((item: ProductPageProduct) => {
  //     return item?.id && item.id === item.id
  //   })
  //   if (existingItem?.id && existingItem?.quantity) {
  //     updateQuantity(existingItem.store.id, existingItem.quantity + quantity)
  //   } else {

  //     addToCart({
  //       ...variants?.[0],
  //       title,
  //       quantity,
  //       previewImageUrl,
  //     })
  //   }
  //   setIsAddToCartClicked(true)
  // }

  //first two items are the fake data
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
  ]

  const price = priceRange?.maxVariantPrice?.amount ?? 0

  const handlePrice = (price: number) => {
    return price * quantity
  }

  const pages = [
    {title: 'Ceiling Lights', path: '/product'},
    {title: title, path: undefined},
  ]

  return (
    <>
      <PageHead page={page} settings={settings} title={homePageTitle} canonicalUrl={canonicalUrl} />
      <Layout settings={settings} preview={preview} loading={loading}>
        {isAddToCartClicked && <CartBanner title={title ?? ''} quantity={quantity} />}
        <div className="productPage w-full">
          <div className="flex justify-between m-7 text-primary font-manrope">
            <Breadcrumbs pages={pages} />
            <p>Need some help? Call our showroom on {settings?.companyInfo?.phone}</p>
          </div>
          <div className="productPage-container mx-auto max-w-2xl py-10 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
              {/* Image*/}
              <div className="relative lg:sticky lg:top-10 w-full">
                <Image
                  src={featuredImage?.url || ''}
                  fill
                  alt={title || ''}
                  sizes="50vw"
                  className="object-contain"
                />
              </div>

              {/* Product info */}
              <div>
                <div className="px-5">
                  <div className="px-4 sm:mt-16 sm:px-0 lg:mt-0">
                    <h1 className="text-3xl font-normal text-primary text-center">{title}</h1>
                    <p className="my-6 lg:mb-0 text-2xl text-center text-secondary">
                      £{handlePrice(price)}
                    </p>
                  </div>

                  <div className="flex flex-col lg:flex-col-reverse items-center">
                    {/* Quantity & Add to Cart */}
                    <div className="flex justify-center items-center gap-2 lg:mb-7 w-full lg:w-4/5">
                      <div className="max-w-32 relative flex items-center max-w-[8rem] border">
                        <button
                          type="button"
                          data-input-counter-decrement="quantity-input"
                          className="hover:bg-gray-100  border-gray-300 p-3 h-[50px] focus:outline-none"
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
                          id="quantity-input"
                          data-input-counter
                          aria-describedby="helper-text-explanation"
                          className="h-11 text-center text-base text-primary block w-full py-2.5"
                          value={quantity}
                          onChange={handleQuantityChange}
                          required
                        />
                        <button
                          type="button"
                          data-input-counter-increment="quantity-input"
                          className="hover:bg-gray-100  border-gray-300 p-3 h-[50px] focus:outline-none"
                          onClick={() => setQuantity((prev) => prev + 1)}
                        >
                          <PlusIcon className="w-3 h-3 text-primary dark:text-white" />
                        </button>
                      </div>

                      <button
                        type="submit"
                        className="flex w-full items-center justify-center border-none bg-primary px-8 py-3 text-base font-normal text-white text-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 uppercase"
                        // onClick={handleAddToCart}
                      >
                        Add to cart
                      </button>
                    </div>

                    <div>
                      {/* description */}
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

          {/* Large CTA */}
          {cta && <LargeCta {...cta} />}

          {/* Sections */}
          {sections && sections.length > 0 && <Sections sections={sections} settings={settings} />}
        </div>
      </Layout>
    </>
  )
}
