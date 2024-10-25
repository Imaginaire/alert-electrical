import {
  allCollectionsQuery,
  allProductsQuery,
  collectionByHandleQuery,
  collectionByIdQuery,
  productsWithMetafieldQuery,
} from './shopify.queries'

export async function callShopify(query: WebGLQuery, variables = {}) {
  try {
    const res = await fetch(
      'https://nottingham-lighting-center-2024.myshopify.com/api/2023-10/graphql.json',
      {
        method: 'POST',
        headers: {
          'X-Shopify-Storefront-Access-Token':
            process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
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

export async function getShopifyProductSlugs() {
  let allProducts: any[] = []
  let hasNextPage = true
  let endCursor = null

  while (hasNextPage) {
    const response = callShopify(allProductsQuery, {after: endCursor})

    const result = await response

    // extract products and pagination info
    const products = result.data.products.edges
    hasNextPage = result.data.products.pageInfo.hasNextPage
    endCursor = result.data.products.pageInfo.endCursor

    // Add products to the final list, and map them to the desired format
    allProducts = allProducts.concat(
      products.map((edge: any) => ({
        slug: `product/${edge.node.handle}`,
        updatedAt: edge.node.updatedAt,
      })),
    )
  }
  return allProducts
}

// Function to fetch all collections from Shopify with pagination
export async function fetchShopifyCollections(): Promise<any[]> {
  let allCollections: any[] = []
  let hasNextPage = true
  let endCursor = null

  while (hasNextPage) {
    const response = await callShopify(allCollectionsQuery, {after: endCursor})
    const result = await response

    const collections = result.data.collections.edges.map((edge: any) => edge.node)
    allCollections = allCollections.concat(collections)

    hasNextPage = result.data.collections.pageInfo.hasNextPage
    endCursor = result.data.collections.pageInfo.endCursor
  }

  return allCollections
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

// Function to find a collection by ID in the collection list
function findCollectionById(collections: any[], id: string): any | null {
  return collections.find((collection) => collection.id === id) || null
}

// Function to build full URLs for all collections

export async function buildAllCollectionUrls(
  allCollections: any[],
): Promise<{slug: string; updatedAt: string}[]> {
  const collectionUrls: {slug: string; updatedAt: string}[] = []

  // Helper function for recursive URL building
  async function buildUrlForCollection(
    collection: any,
    urlSegments: string[] = [],
  ): Promise<string[]> {
    const {handle, metafield} = collection

    // Prepend the handle to the URL segments
    urlSegments.unshift(handle)

    // If there's a parent collection, find it in the list and build its URL
    if (metafield?.value) {
      const parentCollection = findCollectionById(allCollections, metafield.value)
      if (parentCollection) {
        return buildUrlForCollection(parentCollection, urlSegments) // Recursive call
      }
    }

    // Return the full URL segments for this collection
    return urlSegments
  }

  // Iterate over all collections and build their URLs
  for (const collection of allCollections) {
    const urlSegments = await buildUrlForCollection(collection) // Await the recursive function
    if (Array.isArray(urlSegments)) {
      const slug = `/${urlSegments.join('/')}`

      // Add the slug and updatedAt field to the collectionUrls array
      collectionUrls.push({
        slug: `product-category${slug}`,
        updatedAt: collection.updatedAt, // Assuming collections have an updatedAt field
      })
    } else {
      console.error('Error: urlSegments is not an array for collection', collection)
    }
  }

  return collectionUrls
}

// Function to generate slugs for pages by metafield
export async function fetchUniqueMetafieldValues(metafieldKey: string) {
  const metafieldValues: Record<string, string> = {} // Key-value pair: metafieldValue -> latest updatedAt

  let hasNextPage = true
  let endCursor = null

  while (hasNextPage) {
    const variables = {
      after: endCursor,
      key: metafieldKey,
    }
    const response = await callShopify(productsWithMetafieldQuery, variables)

    if (!response || !response.data) {
      throw new Error('Failed to fetch products with metafields')
    }

    // Extract products and their metafield values and updatedAt
    const products = response.data.products.edges
    products.forEach((product: any) => {
      const metafieldValue = product.node.metafield?.value
      const updatedAt = product.node.updatedAt

      if (metafieldValue) {
        // If the metafield value doesn't exist in the map, set it
        if (!metafieldValues[metafieldValue]) {
          metafieldValues[metafieldValue] = updatedAt
        } else {
          // If it exists, compare and store the latest updatedAt
          const currentLatestDate = new Date(metafieldValues[metafieldValue])
          const newDate = new Date(updatedAt)

          if (newDate > currentLatestDate) {
            metafieldValues[metafieldValue] = updatedAt
          }
        }
      }
    })

    // Update pagination info
    hasNextPage = response.data.products.pageInfo.hasNextPage
    endCursor = response.data.products.pageInfo.endCursor
  }

  // Return the metafield values with their latest updatedAt
  return metafieldValues
}

export async function fetchUniqueMetafieldSlugs(metafieldKey: string) {
  const metafieldValues = await fetchUniqueMetafieldValues(metafieldKey)

  // Convert values to slugs and include updatedAt
  return Object.entries(metafieldValues).map(([value, updatedAt]) => {
    const slug = value.split(' ').join('-').toLowerCase()
    return {
      slug: `${metafieldKey}/${slug}`,
      updatedAt, // Use the latest updatedAt for this metafield value
    }
  })
}
