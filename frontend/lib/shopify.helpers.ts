import {collectionByHandleQuery, collectionByIdQuery} from './shopify.queries'

export async function callShopify(query: WebGLQuery, variables = {}) {
  try {
    const res = await fetch(
      'https://nottingham-lighting-center-2024.myshopify.com/api/2023-10/graphql.json',
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

// Helper function to fetch collection by handle (slug)
export async function getCollectionByHandle(handle: string) {
  const variables = {handle}
  const res = await callShopify(collectionByHandleQuery, variables)
  return res?.data?.collectionByHandle || null
}

// Helper function to fetch collection by ID
export async function getCollectionById(id: string) {
  const variables = {id}
  const res = await callShopify(collectionByIdQuery, variables)
  return res?.data?.collection || null
}

// Recursive function to build full URL based on parent-child collections
export async function buildCollectionUrl(
  collection: any,
  urlSegments: string[] = [],
): Promise<string[]> {
  const {handle, metafield} = collection

  // Prepend the handle to the URL segments
  urlSegments.unshift(handle)

  // If there's a parent collection, fetch it by ID
  if (metafield?.value) {
    const parentCollection = await getCollectionById(metafield.value)
    if (parentCollection) {
      return buildCollectionUrl(parentCollection, urlSegments) // Recursive call
    }
  }

  // Return the final URL segments when no more parents are found
  return urlSegments
}
