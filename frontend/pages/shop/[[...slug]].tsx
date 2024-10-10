import ShopPage from '@/components/pages/ShopPage'
import {readToken} from '@/lib/sanity.api'
import {getClient} from '@/lib/sanity.client'
import {
  filtersQuery,
  homePageTitleQuery,
  pagesBySlugQuery,
  settingsQuery,
} from '@/lib/sanity.queries'
import {callShopify, getCollectionByHandle} from '@/lib/shopify.helpers'
import {getCollectionWithFilters} from '@/lib/shopify.queries'
import getCanonicalUrl from '@/shared/utils/getCanonicalUrl'
import {FilterItems, PagePayload, PageProps, SettingsPayload} from '@/types'
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
  const {
    page,
    settings,
    draftMode,
    loading,
    canonicalUrl,
    homePageTitle,
    products,
    filterItems,
    isNextPage,
  } = props

  return (
    <ShopPage
      page={page}
      settings={settings}
      preview={draftMode}
      loading={loading}
      canonicalUrl={canonicalUrl}
      homePageTitle={homePageTitle}
      products={products}
      filterItems={filterItems}
      isNextPage={isNextPage}
    />
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const {draftMode = false, params = {}, resolvedUrl} = context

  // get settings, filterItems and homepage title
  const client = getClient(draftMode)
  const [settings, homePageTitle, filterItems] = await Promise.all([
    client.fetch<SettingsPayload | null>(settingsQuery),
    client.fetch<string | null>(homePageTitleQuery),
    client.fetch<FilterItems | null>(filtersQuery),
  ])

  let handle: string | undefined = undefined

  // Get the last slug segment
  const endSlug = params.slug?.[params.slug.length - 1]

  console.log('resolvedUrl', resolvedUrl)

  // Check if the page is a collection
  const isCollection = resolvedUrl?.startsWith('/collection')

  let pageProps = {}

  if (isCollection && endSlug) {
    handle = endSlug
    pageProps = await getCollectionByHandle(endSlug)
  }

  const isMetafieldPage =
    resolvedUrl?.startsWith('/brand') ||
    resolvedUrl?.startsWith('/finish') ||
    resolvedUrl?.startsWith('/range')

  if (isMetafieldPage && endSlug) {
    pageProps = {
      _type: 'shop',
      title: formatMetaFieldValue(endSlug),
      description: `Products by ${formatMetaFieldValue(endSlug)}`,
    }
  }

  if (!isCollection && !isMetafieldPage) {
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

    pageProps = page
  }

  let products = []
  let productSetting = null
  let isNextPage = false

  // Join the slug segments to form the full slug
  const joinedSlug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug

  const canonicalUrl = getCanonicalUrl('shop')
  // joinedSlug ? `shop/${joinedSlug}` : 'shop'

  const filters = buildFilters(context.query, {
    brand: resolvedUrl?.startsWith('/brand') ? endSlug : undefined,
    finish: resolvedUrl?.startsWith('/finish') ? endSlug : undefined,
  })

  const category = (context.query.category as string)?.split(',') || []

  if (category.length > 0) {
    const productsArrays = await Promise.all(
      category.map(async (value) => {
        const variables = {handle: value, filters}
        const res = await callShopify(getCollectionWithFilters, variables)

        return res.data.collection.products.edges.map((edge: Edge) => edge.node)
        // isNextPage = res.data.collection.products.pageInfo.hasNextPage
      }),
    )

    products = productsArrays.flat()
  } else {
    const variables = {handle, filters}
    const res = await callShopify(getCollectionWithFilters, variables)

    products = res.data.collection.products.edges.map((edge: Edge) => edge.node)
    isNextPage = res.data.collection.products.pageInfo.hasNextPage
    console.log('isNextPage', isNextPage)
  }

  return {
    props: {
      page: pageProps,
      settings: settings ?? {},
      homePageTitle: homePageTitle ?? undefined,
      draftMode,
      token: draftMode ? readToken : null,
      canonicalUrl,
      products: products ?? null,
      productSetting: productSetting ?? null,
      filterItems: filterItems ?? null,
      isNextPage: isNextPage ?? false,
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

function buildFilters(query: any, overrides: any = {}) {
  const {brand, finish} = overrides

  const finishQueryParam = (query.finish as string)?.split(',') || []
  const brandQueryParam = (query.brand as string)?.split(',') || []

  const minPrice = query.minPrice || null
  const maxPrice = query.maxPrice || null

  const filters: any = []

  const finishFiltersArray = finish ? finishQueryParam.concat(finish) : finishQueryParam
  const brandFiltersArray = brand ? brandQueryParam.concat(brand) : brandQueryParam

  finishFiltersArray.forEach((value) => {
    filters.push({
      productMetafield: {
        namespace: 'custom',
        key: 'finish',
        value: formatMetaFieldValue(value),
      },
    })
  })

  brandFiltersArray.forEach((value) => {
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
