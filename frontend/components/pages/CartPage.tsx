import PageHead from './PageHead'
import Layout from '@/shared/Layout'
import {PagePayload, SettingsPayload} from '@/types'

interface CartPageProps {
  page: PagePayload | undefined
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  preview?: boolean
  loading?: boolean
  canonicalUrl?: string
}

export default function CartPage({
  page,
  settings,
  homePageTitle,
  loading,
  preview,
  canonicalUrl,
}: CartPageProps) {
  // const checkout = async () => {
  //   try {
  //     const response = await fetch('/api/checkout', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         variantId: getVariantId(store?.variants?.[0]?._ref ?? ''),
  //       }),
  //     })

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok')
  //     }

  //     const data = await response.json()
  //     const {checkoutUrl} = data
  //     window.location.href = checkoutUrl
  //   } catch (error) {
  //     console.error('Error fetching Shopify data:', error)
  //   }
  // }

  return (
    <Layout settings={settings} preview={preview} loading={loading}>
      <PageHead page={page} settings={settings} title={homePageTitle} canonicalUrl={canonicalUrl} />
      <div className="checkoutPage"></div>
    </Layout>
  )
}
