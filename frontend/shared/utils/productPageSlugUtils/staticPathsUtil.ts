/**
 * This function is used to generate the slugs for the product pages
 */

import {productsQuery} from '@/lib/sanity.queries'
import {callShopify} from '@/lib/shopify.helpers'

export const fetchStaticPaths = async () => {
  try {
    // Fetch all products from Shopify
    const res = await callShopify(productsQuery)
    const products = res?.data?.products?.edges || []

    // Ensure that each product has a valid handle
    const paths = products
      .map(({node}: {node: {handle: string}}) => node.handle) // Get the handle (slug)
      .filter(Boolean) // Filter out any undefined or null handles
      .map((handle: string) => ({
        params: {productpage: handle}, // Return the slug as productpage
      }))

    return paths
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
}
