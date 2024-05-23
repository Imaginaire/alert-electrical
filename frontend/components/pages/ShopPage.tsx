import ScrollUp from '@/shared/utils/ScrollUp'
import {PageProps} from './Page'
import PageHead from './PageHead'
import Layout from '@/shared/Layout'

export function ShopPage({
  page,
  settings,
  preview,
  loading,
  canonicalUrl,
  homePageTitle,
  products,
}: PageProps) {
  console.log(products)
  return (
    <>
      <PageHead page={page} settings={settings} title={homePageTitle} canonicalUrl={canonicalUrl} />

      <Layout settings={settings} preview={preview} loading={loading}>
        <div data-content="main"></div>
        <ScrollUp />
      </Layout>
    </>
  )
}

export default ShopPage
