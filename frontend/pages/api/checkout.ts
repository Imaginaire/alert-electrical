import {callShopify} from '@/lib/shopify.helpers'
import {cartCreateQuery, checkoutUrlQuery} from '@/lib/shopify.queries'

import {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {variantId, email, country, address1, address2, city, province, zip} = req.body

  const variables = {
    input: {
      lines: [{quantity: 1, merchandiseId: `gid://shopify/ProductVariant/${variantId}`}],
    },
  }

  try {
    const cartResponse = await callShopify(cartCreateQuery, variables)

    if (!cartResponse || cartResponse.errors) {
      throw new Error('Cart creation failed - api/checkout.ts')
    }

    const cartId = cartResponse.data.cartCreate.cart.id

    const checkoutUrlResponse = await callShopify(checkoutUrlQuery, {cartId})

    if (!checkoutUrlResponse || checkoutUrlResponse.errors) {
      throw new Error('Checkout URL creation failed - api/checkout.ts')
    }

    const checkoutUrl = checkoutUrlResponse.data.cart.checkoutUrl

    return res.status(200).json({checkoutUrl})
  } catch (error) {
    // console.error(error)
    res.status(500).json({error: 'An error occurred while creating the checkout'})
  }
}
