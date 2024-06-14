import PageHead from './PageHead'
import Layout from '@/shared/Layout'
import {PagePayload, SettingsPayload} from '@/types'

interface CheckoutPageProps {
  page: PagePayload | undefined
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  preview?: boolean
  loading?: boolean
  canonicalUrl?: string
}

export default function CheckoutPage({
  page,
  settings,
  homePageTitle,
  loading,
  preview,
  canonicalUrl,
}: CheckoutPageProps) {
  return (
    <Layout settings={settings} preview={preview} loading={loading}>
      <PageHead page={page} settings={settings} title={homePageTitle} canonicalUrl={canonicalUrl} />
      <div className="checkoutPage"></div>
    </Layout>
  )
}
