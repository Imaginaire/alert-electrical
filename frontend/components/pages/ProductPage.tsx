import {PagePayload, SettingsPayload} from '@/types'
import PageHead from './PageHead'
import Layout from '@/shared/Layout'
import {getVariantId} from '@/lib/shopify.helpers'
import {useState, useEffect} from 'react'
import ProductVariantSelector from '../product/ProductVariantSelector'
import {Variant} from '@/types/productType'

export interface ProductPageProps {
  page: PagePayload | undefined
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  preview?: boolean
  loading?: boolean
  canonicalUrl?: string
}

export default function ProductPage({
  page,
  preview,
  settings,
  homePageTitle,
  loading,
  canonicalUrl,
}: ProductPageProps) {
  const {store} = page || {}
  console.log(store)
  const {title, descriptionHtml, previewImageUrl, productType, variants, tags} = store || {}

  // state for selected variant
  const [selectedVariant, setSelectedVariant] = useState<Variant>()

  const handleVariableChange = (variant: Variant) => setSelectedVariant(variant)

  const handleAddToCart = () => {
    // add to local storage while while user is browsing
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    cart.push(selectedVariant)
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
              <div className="flex flex-col">
                <h2 className="text-2xl py-4">Variants</h2>

                <ProductVariantSelector product={store} onVariantChange={handleVariableChange} />
              </div>
            )}

            {selectedVariant && selectedVariant.store?.price && (
              <p className="text-2xl py-4">Price: £{selectedVariant.store.price}</p>
            )}

            {selectedVariant && <button>Add to cart</button>}
          </div>
        </div>
      </Layout>
    </>
  )
}
