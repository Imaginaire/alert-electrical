export async function callShopify(query: WebGLQuery, variables = {}) {
  try {
    const res = await fetch(
      'https://nottingham-lighting-center-2024.myshopify.com/api/2024-07/graphql.json',
      {
        method: 'POST',
        headers: {
          'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          variables: variables,
        }),
      },
    )

    if (!res.ok) {
      throw new Error('Network response was not ok')
    }

    const jsonResponse = await res.json()
    console.log('data', jsonResponse)
    return jsonResponse
  } catch (error) {
    console.error('Error fetching Shopify data - shopify.helpers:', error)
    return null
  }
}
