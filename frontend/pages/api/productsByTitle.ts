import {callShopify} from '@/lib/shopify.helpers'
import {NextApiRequest, NextApiResponse} from 'next'
import {productsQueryByTitles} from '@/lib/shopify.queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body

  // Extract handlesQuery from body
  const {titlesQuery} = body

  try {
    const productsResponse = await callShopify(productsQueryByTitles, {titlesQuery: titlesQuery})

    if (!productsResponse || productsResponse.errors) {
      throw new Error('An error occurred while fetching products')
    }

    const products = productsResponse.data.products.edges.map((edge: any) => edge.node)

    return res.status(200).json({products})
  } catch (error) {
    res.status(500).json({error: 'An error occurred while fetching products'})
  }
}
