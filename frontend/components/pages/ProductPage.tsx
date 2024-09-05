import {useState, useEffect} from 'react'
import Image from 'next/image'

import PageHead from './PageHead'
import ProductVariantSelector from '../product/ProductVariantSelector'
import Layout from '@/components/global/Layout'
import Sections from '@/components/global/Sections'
import {Variant} from '@/types/productType'
import {PagePayload, ProductSettingPayload, SettingsPayload} from '@/types'

import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'
import {ChevronUpIcon, ChevronDownIcon} from '@heroicons/react/24/outline'

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

  // state for selected variant
  const [selectedVariant, setSelectedVariant] = useState<Variant>()
  const [quantity, setQuantity] = useState<number>(1)

  const handleVariableChange = (variant: Variant) => setSelectedVariant(variant)

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuantity(Number(e.target.value))

  const handleAddToCart = () => {
    // add to local storage while while user is browsing
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')

    // check if cart already has the item, if so, update the quantity
    const existingItem = cart.find((item: Variant) => item?._id === selectedVariant?._id)
    if (existingItem) {
      existingItem.quantity += quantity
      localStorage.setItem('cart', JSON.stringify(cart))
      return
    }

    cart.push({...selectedVariant, quantity, previewImageUrl})
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  //first two items are the fake data
  const details = [
    {name: 'About the product', items: ['the best light you can get']},
    {name: 'Sizing & technical information', items: ['easy fitting']},
    {name: 'warranty', items: [warranty]},
    {name: 'delivery', items: [delivery]},
  ]

  return (
    <>
      <PageHead page={page} settings={settings} title={homePageTitle} canonicalUrl={canonicalUrl} />
      <Layout settings={settings} preview={preview} loading={loading}>
        <div className="productPage w-full">
          <div className="productPage-container mx-auto max-w-2xl py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
              {/* Image*/}
              <div className="relative w-full h-[520px]">
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
                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                  <h1 className="text-2xl font-normal text-primary text-center">{title}</h1>
                  <p className="mt-3 text-2xl text-center text-secondary">£999</p>
                </div>

                <div dangerouslySetInnerHTML={{__html: descriptionHtml ?? ''}} />

                <div className="mt-10 flex">
                  <button
                    type="submit"
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Add to bag
                  </button>
                </div>

                {/* {store && variants?.length && (
              <ProductVariantSelector product={store} onVariantChange={handleVariableChange} />
            )}

            {selectedVariant && selectedVariant.store?.price && (
              <p className="text-2xl py-4">Price: £{selectedVariant.store.price * quantity}</p>
            )} */}

                {/* Quantity  */}
                {/* <div className="flex flex-col">
              <label htmlFor="quantity" className="text-xl">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                max="10"
                defaultValue="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 h-10"
              />
            </div> */}

                {/* {selectedVariant && <button onClick={handleAddToCart}>Add to cart</button>} */}

                {/* Additional details */}
                <div className="divide-y divide-gray-200 border-b">
                  {details.map((detail) => (
                    <Disclosure key={detail.name} as="div">
                      <h3>
                        <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
                          <span className="text-sm font-medium text-gray-900 group-data-[open]:text-indigo-600">
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
