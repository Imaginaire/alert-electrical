import Layout from '@/components/global/Layout'
import ScrollUp from '../../shared/utils/ScrollUp'

import PageHead from './PageHead'
import ShortHero from '../sections/ShortHero'
import ProductCard from '../global/ProductCard'

export function CollectionPage({page, settings}) {
  console.log(page)

  const {title, description, products} = page.data

  return (
    <>
      <PageHead />

      <Layout settings={settings}>
        <div data-content="main">
          <ShortHero header={title} description={description} shopifyData={true} />
          <div className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-x-4 gap-y-11 max-w-[1728px] mx-auto p-5 pt-9">
            {/* Products */}
            {products && products.length > 0 ? (
              products.map((product) => {
                const {title, featuredImage, brand, id, slug} = product || {}
                return <ProductCard product={product} key={product.id} />
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
