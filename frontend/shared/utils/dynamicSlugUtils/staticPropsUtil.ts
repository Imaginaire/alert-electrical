/**
 * This file contains the static props function that is used to fetch the data for the dynamic slug pages.
 */

// Utils
import {GetStaticProps} from 'next'
import {getClient} from '@/lib/sanity.client'
import getCanonicalUrl from '../getCanonicalUrl'
import {readToken} from '@/lib/sanity.api'

// Types
import {SettingsPayload, PagePayload, PageProps, FilterItems} from '@/types'

// Queries
import {
  settingsQuery,
  pagesBySlugQuery,
  homePageTitleQuery,
  productSettingQuery,
  filtersQuery,
} from '@/lib/sanity.queries'
import {buildCollectionUrl, callShopify, getCollectionByHandle} from '@/lib/shopify.helpers'
import {collectionByMetafieldQuery, productQuery, productsQuery} from '@/lib/shopify.queries'
import validateUrl from '../validateUrl'

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

  // get settings, and homepage title
  const client = getClient(draftMode)
  const [settings, homePageTitle] = await Promise.all([
    client.fetch<SettingsPayload | null>(settingsQuery),
    client.fetch<string | null>(homePageTitleQuery),
  ])

  // if the page is not a collection, fetch the page data from Sanity
  let products = null
  let productSetting = null
  let filterItems = null

  // Join the slug segments to form the full slug
  const joinedSlug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug

  const canonicalUrl = getCanonicalUrl(joinedSlug)

  // Fetch the page data
  const [page] = await Promise.all([
    client.fetch<PagePayload | null>(pagesBySlugQuery, {
      slug: joinedSlug, // Join the segments to form the full slug
    }),
  ])

  if (!page) {
    return {
      notFound: true,
    }
  }

  // Fetch products and filters if the page is a shop page
  if (page._type === 'shop') {
    const res = await callShopify(productsQuery)
    products = res.data.products.edges.map((edge: Edge) => edge.node)
    const filterRes = await client.fetch<FilterItems | null>(filtersQuery)
    filterItems = filterRes
  }

  return {
    props: {
      page,
      settings: settings ?? {},
      homePageTitle: homePageTitle ?? null,
      draftMode,
      token: draftMode ? readToken : null,
      canonicalUrl,
      products: products ?? null,
      productSetting: productSetting ?? null,
      filterItems: filterItems ?? null,
    },
    // Re-generate the page every 10 seconds: see Next.js revalidation docs
    revalidate: 10,
  }
}
