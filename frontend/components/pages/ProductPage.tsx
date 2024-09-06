import {useState, useEffect} from 'react'
import Image from 'next/image'

import PageHead from './PageHead'
import Layout from '@/components/global/Layout'
import Sections from '@/components/global/Sections'
import {Variant} from '@/types/productType'
import {PagePayload, ProductSettingPayload, SettingsPayload} from '@/types'

import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'
import {ChevronUpIcon, ChevronDownIcon, MinusIcon, PlusIcon} from '@heroicons/react/24/outline'

export interface ProductPageProps {
  page: PagePayload | undefined
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  preview?: boolean
  loading?: boolean
  canonicalUrl?: string
  addToCartText?: string
  productSetting?: ProductSettingPayload
}

export default function ProductPage({
  page,
  preview,
  settings,
  homePageTitle,
  loading,
  canonicalUrl,
  productSetting,
}: ProductPageProps) {
  const {store, sections} = page || {}
  const {title, descriptionHtml, previewImageUrl, variants} = store || {}
  const {warranty, delivery, Cta} = productSetting || {}

  const [quantity, setQuantity] = useState<number>(1)

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuantity(Number(e.target.value))

  const handleAddToCart = () => {
    // add to local storage while while user is browsing
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')

    // check if cart already has the item, if so, update the quantity
    const existingItem = cart.find((item: Variant) => item?._id === variants?.[0]._id)
    if (existingItem) {
      existingItem.quantity += quantity
      localStorage.setItem('cart', JSON.stringify(cart))
      return
    }

    cart.push({...variants?.[0], title, quantity, previewImageUrl})
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  //first two items are the fake data
  const details = [
    {name: 'About the product', items: ['the best light you can get']},
    {name: 'Sizing & technical information', items: ['easy fitting']},
    {name: 'warranty', items: [warranty]},
    {name: 'delivery', items: [delivery]},
  ]

  const price = variants?.[0]?.store?.price ?? 0

  const handlePrice = (price: number) => {
    return price * quantity
  }

  return (
    <>
      <PageHead page={page} settings={settings} title={homePageTitle} canonicalUrl={canonicalUrl} />
      <Layout settings={settings} preview={preview} loading={loading}>
        <div className="productPage w-full">
          <div className="productPage-container mx-auto max-w-2xl py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
              {/* Image*/}
              <div className="relative w-full h-[520px] lg:h-full">
                <Image
                  src={previewImageUrl || ''}
                  fill
                  alt={title || ''}
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              {/* Product info */}
              <div className="px-5">
                <div className="px-4 sm:mt-16 sm:px-0 lg:mt-0">
                  <h1 className="text-2xl font-normal text-primary text-center">{title}</h1>
                  <p className="my-6 lg:mb-0 text-2xl text-center text-secondary">
                    £{handlePrice(price)}
                  </p>
                </div>

                <div className="flex flex-col lg:flex-col-reverse">
                  <div className="flex justify-center items-center gap-2 lg:mb-7">
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
                      onClick={handleAddToCart}
                    >
                      Add to cart
                    </button>
                  </div>

                  <div>
                    {/* description */}
                    <div
                      className="my-6 lg:my-3 leading-[26px] font-manrope"
                      dangerouslySetInnerHTML={{__html: descriptionHtml ?? ''}}
                    />

                    {/* inventory */}
                    <div className="flex gap-3 items-center justify-center font-manrope text-primary mt-6 mb-32 lg:my-8">
                      {variants?.[0]?.store?.inventory?.isAvailable ? (
                        <>
                          <div className="w-4 h-4 rounded-full bg-green-500" />
                          <p>In stock - see delivery information for delivery timeframes</p>
                        </>
                      ) : (
                        <>
                          <div className="w-4 h-4 rounded-full bg-red-500" />
                          <p>Out of stock</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional details */}
                <div className="divide-y divide-gray-200 border-b">
                  {details.map((detail) => (
                    <Disclosure key={detail.name} as="div">
                      <h3>
                        <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
                          <span className="text-xl font-medium text-gray-900 group-data-[open]:text-indigo-600">
                            {detail.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="block h-6 w-6 text-gray-400 group-hover:text-gray-500 group-data-[open]:hidden"
                            />
                            <ChevronUpIcon
                              aria-hidden="true"
                              className="hidden h-6 w-6 text-indigo-400 group-hover:text-indigo-500 group-data-[open]:block"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="prose prose-sm pb-6">
                        <ul role="list">
                          {detail.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </div>
              </div>
            </div>

            {/* Sections */}
            {sections && sections.length > 0 && <Sections sections={sections} />}
          </div>
        </div>
      </Layout>
    </>
  )
}
