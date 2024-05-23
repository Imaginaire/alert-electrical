import {PagePayload, SettingsPayload} from '@/types'
import PageHead from './PageHead'
import Layout from '@/shared/Layout'
import {getVariantId} from '@/lib/shopify.helpers'

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
  const {title, descriptionHtml, previewImageUrl, productType, tags} = store || {}

  console.log(store.gid)

  const checkout = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          variantId: getVariantId(store.variants[0]._ref),
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
        <div>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{__html: descriptionHtml}} />
        </div>
        <button onClick={checkout}>Buy</button>
      </Layout>
    </>
  )
}
