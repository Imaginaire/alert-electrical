// Utils
import getCanonicalUrl from '@/shared/utils/getCanonicalUrl'
import {GetStaticPaths, GetStaticProps} from 'next'
import {getClient} from '@/lib/sanity.client'
import {readToken} from '@/lib/sanity.api'
import {useLiveQuery} from 'next-sanity/preview'
import groq from 'groq'

// Queries
import {
  settingsQuery,
  pagesBySlugQuery,
  homePageTitleQuery,
  pagePaths,
  productsQuery,
} from '@/lib/sanity.queries'

// Types
import {SettingsPayload, PagePayload, PageProps} from '@/types'

// Components
import {Page} from '@/components/pages/Page'
import ProductPage from '@/components/pages/ProductPage'
import ShopPage from '@/components/pages/ShopPage'
import CheckoutPage from '@/components/pages/CheckoutPage'

interface Query {
  [key: string]: string
}

export default function PageSlugRoute(props: PageProps) {
  const {homePageTitle, settings, page: initialPage, products, draftMode, canonicalUrl} = props

  const [page, loading] = useLiveQuery<PagePayload | null | undefined>(
    initialPage,
    pagesBySlugQuery,
    {
      slug: initialPage?.slug,
    },
  )

  console.log('pageType: ' + page?._type)

  let pageComponent: JSX.Element

  switch (page?._type) {
    case 'page':
      pageComponent = (
        <Page
          settings={settings}
          page={page}
          homePageTitle={homePageTitle}
          preview={draftMode}
          loading={loading}
          canonicalUrl={canonicalUrl}
        />
      )
      break
    case 'shop':
      pageComponent = (
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
      break
    case 'checkout':
      pageComponent = (
        <CheckoutPage
          page={page}
          settings={settings}
          preview={draftMode}
          loading={loading}
          canonicalUrl={canonicalUrl}
          homePageTitle={homePageTitle}
        />
      )
      break
    case 'product':
      pageComponent = (
        <ProductPage
          page={page}
          preview={draftMode}
          settings={settings}
          loading={loading}
          canonicalUrl={canonicalUrl}
          homePageTitle={homePageTitle}
        />
      )
      break
    default:
      pageComponent = (
        <Page
          settings={settings}
          page={page}
          homePageTitle={homePageTitle}
          preview={draftMode}
          loading={loading}
          canonicalUrl={canonicalUrl}
        />
      )
  }

  console.log(pageComponent)

  return pageComponent
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const {draftMode = false, params = {}} = ctx
  const client = getClient(draftMode)
  let products = null

  const joinedSlug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug

  const canonicalUrl = getCanonicalUrl(joinedSlug)

  const [settings, page, homePageTitle] = await Promise.all([
    client.fetch<SettingsPayload | null>(settingsQuery),
    client.fetch<PagePayload | null>(pagesBySlugQuery, {
      slug: joinedSlug, // Join the segments to form the full slug
    }),
    client.fetch<string | null>(homePageTitleQuery),
  ])

  if (!page) {
    return {
      notFound: true,
    }
  }

  // Fetch products if the page is a shop page
  if (page._type === 'shop') {
    products = await client.fetch(productsQuery)
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
    },
    revalidate: 10,
  }
}

export const getStaticPaths = async () => {
  const client = getClient()

  const paths = await client.fetch<string[]>(pagePaths)
  const productPaths = await client.fetch<string[]>(groq`*[_type == "product"].store.slug.current`)

  let formattedPaths = paths.map((slug) => {
    // Split the slug into segments
    const slugSegments = slug.split('/')

    // Return an object with the joined slug segments as params
    return {params: {slug: slugSegments}}
  })

  //   add product paths
  formattedPaths = formattedPaths.concat(
    productPaths.map((slug) => {
      return {params: {slug: slug.split('/')}}
    }),
  )

  return {
    paths: formattedPaths || [],
    fallback: 'blocking',
  }
}
