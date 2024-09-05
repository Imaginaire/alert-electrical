import {PagePayload, ProductSettingPayload, SettingsPayload} from '@/types'
import PageHead from './PageHead'
import Layout from '@/components/global/Layout'
import {useState, useEffect} from 'react'
import ProductVariantSelector from '../product/ProductVariantSelector'
import {Variant} from '@/types/productType'
import Sections from '@/components/global/Sections'

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

  console.log('productSetting', productSetting)

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

  return (
    <>
      <PageHead page={page} settings={settings} title={homePageTitle} canonicalUrl={canonicalUrl} />
      <Layout settings={settings} preview={preview} loading={loading}>
        <div className="productPage w-full flex justify-center my-16">
          <div className="productPage-container w-3/4 max-w-screen-xl flex flex-col items-center">
            <img src={previewImageUrl} alt={title} className="w-64 h-64 object-cover" />
            <h1 className="text-4xl py-4 text-center ">{title}</h1>
            <div dangerouslySetInnerHTML={{__html: descriptionHtml ?? ''}} />

            {store && variants?.length && (
              <ProductVariantSelector product={store} onVariantChange={handleVariableChange} />
            )}

            {selectedVariant && selectedVariant.store?.price && (
              <p className="text-2xl py-4">Price: £{selectedVariant.store.price * quantity}</p>
            )}

            {/* Quantity  */}
            <div className="flex flex-col">
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
            </div>

            {selectedVariant && <button onClick={handleAddToCart}>Add to cart</button>}

            {/* Sections */}
            {sections && sections.length > 0 && <Sections sections={sections} />}
          </div>
        </div>
      </Layout>
    </>
  )
}
