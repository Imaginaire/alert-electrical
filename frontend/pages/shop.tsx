import ShopPage from '@/components/pages/ShopPage'
import {readToken} from '@/lib/sanity.api'
import {getClient} from '@/lib/sanity.client'
import {homePageTitleQuery, pagesBySlugQuery, settingsQuery} from '@/lib/sanity.queries'
import {callShopify} from '@/lib/shopify.helpers'
import {getCollectionWithFilters} from '@/lib/shopify.queries'
import getCanonicalUrl from '@/shared/utils/getCanonicalUrl'
import {PagePayload, PageProps, SettingsPayload} from '@/types'
import {GetServerSideProps} from 'next'

interface Edge {
  cursor: string
  node: {
    brand: {
      value: string
    }
    descriptionHtml: string
    featuredImage: {
      url: string
    }
    id: string
    priceRange: {
      maxVariantPrice: {
        amount: string
      }
      minVariantPrice: {
        amount: string
      }
    }
    slug: string
    title: string
  }
}

export default function Shop(props: PageProps) {
  const {page, settings, draftMode, loading, canonicalUrl, homePageTitle, products} = props

  return (
    <ShopPage
      page={page}
      settings={settings}
      preview={draftMode}
      loading={loading}
      canonicalUrl={canonicalUrl}
      homePageTitle={homePageTitle}
      products={products}
    />
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  let products = []
  let productSetting = null

  const {draftMode = false, params = {}} = context

  // get settings, and homepage title
  const client = getClient(draftMode)
  const [settings, homePageTitle] = await Promise.all([
    client.fetch<SettingsPayload | null>(settingsQuery),
    client.fetch<string | null>(homePageTitleQuery),
  ])

  const canonicalUrl = getCanonicalUrl('shop')

  // Fetch the page data
  const [page] = await Promise.all([
    client.fetch<PagePayload | null>(pagesBySlugQuery, {
      slug: 'shop',
    }),
  ])

  if (!page) {
    return {
      notFound: true,
    }
  }

  const finish = (context.query.finish as string)?.split(',') || []
  const brand = (context.query.brand as string)?.split(',') || []

  const category = (context.query.category as string)?.split(',') || []

  const minPrice = context.query.minPrice || null
  const maxPrice = context.query.maxPrice || null

  const filters: any = []

  finish.forEach((value) => {
    filters.push({
      productMetafield: {
        namespace: 'custom',
        key: 'finish',
        value: formatMetaFieldValue(value),
      },
    })
  })

  brand.forEach((value) => {
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

  const variables = {
    filters,
  }

  // hacky way to get multiple categories
  if (category.length > 0) {
    const resArray = await Promise.all(
      category.map((value) => {
        return callShopify(getCollectionWithFilters, {
          handle: value,
          variables,
        })
      }),
    )

    resArray.forEach((res) => {
      products.push(...res.data.collection.products.edges.map((edge: Edge) => edge.node))
    })
  } else {
    const res = await callShopify(getCollectionWithFilters, variables)
    products = res.data.collection.products.edges.map((edge: Edge) => edge.node)
  }

  return {
    props: {
      page,
      settings: settings ?? {},
      homePageTitle: homePageTitle ?? undefined,
      draftMode,
      token: draftMode ? readToken : null,
      canonicalUrl,
      products: products ?? null,
      productSetting: productSetting ?? null,
    },
  }
}

function formatMetaFieldValue(val: string) {
  return val
    .toString()
    .split('-')
    .join(' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())
}
