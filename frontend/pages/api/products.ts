import {callShopify} from '@/lib/shopify.helpers'
import {getCollectionWithFilters} from '@/lib/shopify.queries'
import {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body

  const {handle, filters, after, sortKey, reverse} = body

  try {
    const productsResponse = await callShopify(getCollectionWithFilters, {
      handle: handle,
      filters: filters,
      after: after,
      sortKey: sortKey,
      reverse: reverse,
    })

    if (!productsResponse || productsResponse.errors) {
      throw new Error('An error occurred while fetching products')
    }

    const products = productsResponse.data.collection.products.edges.map((edge: any) => edge.node)
    const lastCursor =
      productsResponse.data.collection.products.edges[
        productsResponse.data.collection.products.edges.length - 1
      ].cursor
    const isNextPage = productsResponse.data.collection.products.pageInfo.hasNextPage

    return res.status(200).json({products, lastCursor, isNextPage})
  } catch {
    res.status(500).json({error: 'An error occurred while fetching products'})
  }
}
