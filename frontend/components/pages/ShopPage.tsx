import ScrollUp from '@/shared/utils/ScrollUp'
import {PageProps} from '@/types'
import PageHead from './PageHead'
import Layout from '@/components/global/Layout'
import {useEffect, useState} from 'react'
import ShortHero from '../sections/ShortHero'
import ProductCard from '../global/ProductCard'
import Filter from '../shop/Filter'
import {useBreadcrumbs} from '@/contexts/BreadcrumbContext'
import {useRouter} from 'next/router'
import {usePathname, useSearchParams} from 'next/navigation'
import {ShopPageProduct} from '@/types/productType'

export function ShopPage({
  page,
  settings,
  preview,
  loading,
  canonicalUrl,
  homePageTitle,
  filterItems,
}: PageProps) {
  const [products, setProducts] = useState<ShopPageProduct[]>([])
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [lastCursor, setLastCursor] = useState<string | null>(null)
  const [isNextPage, setIsNextPage] = useState<boolean>(true)

  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  // const category = searchParams.get('category')
  const brand = searchParams.get('brand') || null
  const finish = searchParams.get('finish') || null
  const minPrice = searchParams.get('minPrice') || null
  const maxPrice = searchParams.get('maxPrice') || null

  console.log('products', products)
  // console.log('filterItems', filterItems)
  // console.log('shoppppisNextPage', isNextPage)
  // console.log('finish', finish)

  // DONE create API handler
  // obtain the paramters from the current URL
  // fetch the products, passing the parameters
  // 1. filter by price DONE
  // 2. load more DONE
  // 3. sort
  // 4. category/handle

  const shortHero = page?.shortHero ?? {
    header: page?.title,
    description: page?.description,
    shopifyData: true,
  }

  const finishQueryParam = (finish as string)?.split(',') || []
  const brandQueryParam = (brand as string)?.split(',') || []

  const filters = buildFilters(finishQueryParam, brandQueryParam, minPrice, maxPrice)

  useEffect(() => {
    // get products from clientside
    // parameters:
    // number of products to fetch, last cursor, brand filter, categories filter, price filter, finish filter

    // const categoryQueryParam = (category as string)?.split(',') || []

    const controller = new AbortController()

    const getFilteredProducts = async () => {
      setIsFetching(true)

      try {
        const {products, lastCursor, isNextPage} = await fetchProducts(
          {
            // handle,
            filters,
          },
          controller.signal,
        )

        setProducts(products)
        setLastCursor(lastCursor)
        setIsNextPage(isNextPage)
        setIsFetching(false)
      } catch (e) {
        setIsFetching(false)
      }
    }

    getFilteredProducts()

    return () => controller?.abort()
  }, [brand, finish, minPrice, maxPrice])

  const handleLoadMoreClick = async () => {
    try {
      setIsFetching(true)

      const {
        products,
        lastCursor: newCursor,
        isNextPage,
      } = await fetchProducts({
        // handle,
        filters,
        after: lastCursor,
      })

      setProducts((prev) => [...prev, ...products])
      setLastCursor(newCursor)
      setIsNextPage(isNextPage)
      setIsFetching(false)
    } catch (e) {
      setIsFetching(false)
    }
  }

  // set breadcrumbs
  const {setBreadcrumbsFromUrl} = useBreadcrumbs()
  useEffect(() => {
    if (router && router.asPath) {
      setBreadcrumbsFromUrl(router.asPath)
    }
  }, [router])

  return (
    <>
      <PageHead page={page} settings={settings} title={homePageTitle} canonicalUrl={canonicalUrl} />

      <Layout settings={settings} preview={preview} loading={loading}>
        <div data-content="main">
          <ShortHero {...shortHero} />
          <div className="max-w-[1728px] mx-auto  pt-0">
            {/* Filter */}
            <Filter filterItems={filterItems ?? undefined} />
            <div className="shop-page grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-x-4 gap-y-11 pt-9 p-5">
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
            {isNextPage && (
              <div className="flex justify-center">
                <button
                  className="uppercase text-center text-primary underline mt-6 mb-[60px] hover:text-[#009FE3]"
                  onClick={handleLoadMoreClick}
                  disabled={isFetching}
                >
                  load more
                </button>
              </div>
            )}
          </div>
        </div>

        <ScrollUp />
      </Layout>
    </>
  )
}

export default ShopPage

function buildFilters(
  finishQueryParam: string[],
  brandQueryParam: string[],
  minPrice: string | null,
  maxPrice: string | null,
) {
  const filters = []

  finishQueryParam.forEach((value) => {
    filters.push({
      productMetafield: {
        namespace: 'custom',
        key: 'finish',
        value: formatMetaFieldValue(value),
      },
    })
  })

  brandQueryParam.forEach((value) => {
    filters.push({
      productMetafield: {
        namespace: 'custom',
        key: 'brand',
        value: formatMetaFieldValue(value),
      },
    })
  })

  if (minPrice) {
    filters.push({
      price: {min: Number(minPrice)},
    })
  }

  if (maxPrice) {
    filters.push({
      price: {max: Number(maxPrice)},
    })
  }

  return filters
}

function formatMetaFieldValue(val: string) {
  return val
    .toString()
    .split('-')
    .join(' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())
}

const fetchProducts = async (body: any, signal?: AbortSignal) => {
  const res = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    signal,
  })

  const data = await res.json()
  return data
}
