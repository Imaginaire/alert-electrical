import ShopPage from '@/components/pages/ShopPage'
import {readToken} from '@/lib/sanity.api'
import {getClient} from '@/lib/sanity.client'
import {homePageTitleQuery, pagesBySlugQuery, settingsQuery} from '@/lib/sanity.queries'
import {callShopify} from '@/lib/shopify.helpers'
import {productsQuery} from '@/lib/shopify.queries'
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
  let products = null
  let productSetting = null

  const {draftMode = false, params = {}} = context

  console.log('query: ', context.query)

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

  const res = await callShopify(productsQuery)
  products = res.data.products.edges.map((edge: Edge) => edge.node)

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
