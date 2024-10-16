import {callShopify} from '@/lib/shopify.helpers'
import {searchProductsQuery} from '@/lib/shopify.queries'
import {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body

  const {query} = body

  try {
    const productsResponse = await callShopify(searchProductsQuery, {
      query: query,
    })

    if (!productsResponse || productsResponse.errors) {
      throw new Error('An error occurred while fetching products')
    }

    const products = productsResponse.data.search.edges.map((edge: any) => edge.node)

    return res.status(200).json({products})
  } catch {
    res.status(500).json({error: 'An error occurred while fetching products'})
  }
}
