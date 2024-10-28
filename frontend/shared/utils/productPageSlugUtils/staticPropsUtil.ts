/**
 * This file fetches the product data by slug (handle) and settings data from Sanity
 */

import {FilterItems, SettingsPayload} from '@/types'
import {callShopify} from '@/lib/shopify.helpers'
import {getClient} from '@/lib/sanity.client'
import {
  settingsQuery,
  homePageTitleQuery,
  productSettingQuery,
  filtersQuery,
} from '@/lib/sanity.queries'
import {productQuery} from '@/lib/shopify.queries'
import {GetStaticProps} from 'next'
import getCanonicalUrl from '../getCanonicalUrl'

export const fetchStaticProps: GetStaticProps = async ({params}) => {
  const productSlug = params?.productpage // Get the slug from the URL

  if (!productSlug) {
    return {
      notFound: true,
    }
  }

  // Fetch the product data from Shopify using the slug (handle)
  const variables = {handle: productSlug}
  const res = await callShopify(productQuery, variables)

  const product = res?.data?.product || null

  if (!product) {
    return {
      notFound: true,
    }
  }

  const client = getClient(false)
  const [settings, homePageTitle, productSetting] = await Promise.all([
    client.fetch<SettingsPayload | null>(settingsQuery),
    client.fetch<string | null>(homePageTitleQuery),
    client.fetch<string | null>(productSettingQuery),
  ])

  const filterItems = await client.fetch<FilterItems | null>(filtersQuery)

  return {
    props: {
      product,
      settings,
      homePageTitle,
      productSetting,
      filterItems,
    },
    revalidate: 10, // Re-generate the page every 10 seconds
  }
}
