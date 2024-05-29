import ScrollUp from '@/shared/utils/ScrollUp'
import {PageProps} from '@/types'
import PageHead from './PageHead'
import Layout from '@/shared/Layout'
import {resolveHref} from '@/shared/utils/resolveHref'
import Link from 'next/link'

export function ShopPage({
  page,
  settings,
  preview,
  loading,
  canonicalUrl,
  homePageTitle,
  products,
}: PageProps) {
  console.log(page)
  return (
    <>
      <PageHead page={page} settings={settings} title={homePageTitle} canonicalUrl={canonicalUrl} />

      <Layout settings={settings} preview={preview} loading={loading}>
        <div data-content="main">
          <h1 className="text-4xl text-center py-12">{page?.title}</h1>

          <div className="grid grid-cols-4 gap-8 py-24">
            {/* Products */}
            {products && products.length > 0 ? (
              products.map((product) => {
                console.log(product)
                const {title, descriptionHtml, previewImageUrl, productType, tags} =
                  product.store || {}
                return (
                  <div key={product._id} className="flex flex-col items-center">
                    <img src={previewImageUrl} alt={title} className="w-64 h-64 object-cover" />
                    <h2 className="text-2xl">{title}</h2>

                    <Link
                      className=" bg-cyan-500 px-4 py-2 rounded-md text-white"
                      href={product?.store?.slug?.current || '/'}
                    >
                      View Product
                    </Link>
                  </div>
                )
              })
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
        <ScrollUp />
      </Layout>
    </>
  )
}

export default ShopPage
