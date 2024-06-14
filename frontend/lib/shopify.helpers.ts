export async function callShopify(query: WebGLQuery, variables = {}) {
  try {
    const res = await fetch('https://imaginaire-test.myshopify.com/api/2023-10/graphql.json', {
      method: 'POST',
      headers: {
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    })

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
