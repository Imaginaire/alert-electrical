import {PagePayload, SettingsPayload} from '@/types'
import PageHead from './PageHead'
import Layout from '@/shared/Layout'
import {getVariantId} from '@/lib/shopify.helpers'
import Image from 'next/image'

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

  const checkout = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          variantId: getVariantId(store?.variants?.[0]?._ref ?? ''),
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      const {checkoutUrl} = data
      window.location.href = checkoutUrl
    } catch (error) {
      console.error('Error fetching Shopify data:', error)
    }
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

            {variants?.length && (
              <div className="flex flex-col">
                <h2 className="text-2xl py-4">Variants</h2>
                <ul>
                  {/* {variants.map((variant) => {
                    const {title, price, available} = variant
                    return (
                      <li key={variant._key} className="flex justify-between">
                        <span>{title}</span>
                        <span>{price}</span>
                        <span>{available ? 'Available' : 'Sold out'}</span>
                      </li>
                    )

                  }
                  )} */}
                </ul>
              </div>
            )}

            <button onClick={checkout}>Buy</button>
          </div>
        </div>
      </Layout>
    </>
  )
}
