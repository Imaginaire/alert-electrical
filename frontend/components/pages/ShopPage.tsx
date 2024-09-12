import ScrollUp from '@/shared/utils/ScrollUp'
import {PageProps} from '@/types'
import PageHead from './PageHead'
import Layout from '@/components/global/Layout'
import {resolveHref} from '@/shared/utils/resolveHref'
import Link from 'next/link'
import {useState} from 'react'
import ShortHero from '../sections/ShortHero'

export function ShopPage({
  page,
  settings,
  preview,
  loading,
  canonicalUrl,
  homePageTitle,
  products,
}: PageProps) {
  const [numOfProductsToShow, setNumOfProductsToShow] = useState<number>(24)

  const {shortHero} = page || {}

  return (
    <>
      <PageHead page={page} settings={settings} title={homePageTitle} canonicalUrl={canonicalUrl} />

      <Layout settings={settings} preview={preview} loading={loading}>
        <div data-content="main">
          {shortHero && <ShortHero {...shortHero} />}
          <div className="grid grid-cols-4 gap-8 py-24">
            {/* Products */}
            {products && products.length > 0 ? (
              products.slice(0, numOfProductsToShow).map((product) => {
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
          {products && numOfProductsToShow < products.length && (
            <div className="flex justify-center">
              <button
                className="uppercase text-center underline mt-6 hover:text-[#009FE3]"
                onClick={() => {
                  setNumOfProductsToShow((prev) => prev + 24)
                }}
              >
                load more
              </button>
            </div>
          )}
        </div>

        <ScrollUp />
      </Layout>
    </>
  )
}

export default ShopPage
