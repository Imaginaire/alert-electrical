/**
 * This file contains the static props function that is used to fetch the data for the dynamic slug pages.
 */

// Utils
import {GetStaticProps} from 'next'
import {getClient} from '@/lib/sanity.client'
import getCanonicalUrl from '../getCanonicalUrl'
import {readToken} from '@/lib/sanity.api'

// Types
import {SettingsPayload, PagePayload, PageProps} from '@/types'

// Queries
import {
  settingsQuery,
  pagesBySlugQuery,
  homePageTitleQuery,
  productSettingQuery,
} from '@/lib/sanity.queries'
import {buildCollectionUrl, callShopify, getCollectionByHandle} from '@/lib/shopify.helpers'
import {productQuery, productsQuery} from '@/lib/shopify.queries'

interface Query {
  [key: string]: string
}

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

export const fetchStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const {draftMode = false, params = {}} = ctx

  // Get the last slug segment
  const endSlug = params.slug[params.slug.length - 1]

  // Check if the page is a collection
  const collection = await getCollectionByHandle(endSlug)

  // If the page is a collection, fetch the collection data
  if (collection) {
    // Build the full URL path by recursively fetching parent collections
    const urlSegments = await buildCollectionUrl(collection)
    const fullUrl = '/' + urlSegments.join('/')

    // Get products for the collection
    const formattedProducts = collection.products.edges.map((edge: Edge) => edge.node)

    // get settings, and homepage title
    const client = getClient(draftMode)
    const [settings, homePageTitle] = await Promise.all([
      client.fetch<SettingsPayload | null>(settingsQuery),
      client.fetch<string | null>(homePageTitleQuery),
    ])

    return {
      props: {
        page: {
          _type: 'collection',
          data: {
            ...collection,
            products: formattedProducts,
          },
        },
        settings: settings ?? {},
        homePageTitle: homePageTitle ?? undefined,
        canonicalUrl: getCanonicalUrl(fullUrl),
        productSetting: undefined,
        draftMode,
      },
      revalidate: 10,
    }
  }

  // if the page is not a collection, fetch the page data from Sanity
  const client = getClient(draftMode)
  let products = null
  let productSetting = null

  // Join the slug segments to form the full slug
  const joinedSlug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug

  const canonicalUrl = getCanonicalUrl(joinedSlug)

  // Fetch the page data
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
    const res = await callShopify(productsQuery)
    products = res.data.products.edges.map((edge: Edge) => edge.node)
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
      productSetting: productSetting ?? undefined,
    },
    // Re-generate the page every 10 seconds: see Next.js revalidation docs
    revalidate: 10,
  }
}
