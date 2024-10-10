import gql from 'graphql-tag'

export const cartCreateQuery = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        createdAt
        updatedAt
        lines(first: 10) {
          edges {
            node {
              id
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
        buyerIdentity {
          deliveryAddressPreferences {
            __typename
          }
        }
        attributes {
          key
          value
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
          totalDutyAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`
export const checkoutUrlQuery = `
  query checkoutURL($cartId: ID!) {
    cart(id: $cartId) {
      checkoutUrl
    }
  }
`

export const productsQuery = `
  query productsQuery {
    products(first: 24) {
      edges {
        node {
          id
          title
          slug: handle
          brand: metafield(namespace: "custom", key: "brand") {
            value
          }
          featuredImage {
            url
          }
          priceRange {
            maxVariantPrice {
              amount
            }
            minVariantPrice {
              amount
            }
          }
          compareAtPriceRange {
            maxVariantPrice {
              amount
            }
            minVariantPrice {
              amount
            }
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`

export const productsQuerySortKey = `
  query productsQuery($sortKey: ProductSortKeys) {
    products(first: 6 sortKey: $sortKey) {
      edges {
        node {
          id
          title
          slug: handle
          brand: metafield(namespace: "custom", key: "brand") {
            value
          }
          featuredImage {
            url
          }
          priceRange {
            maxVariantPrice {
              amount
            }
            minVariantPrice {
              amount
            }
          }
          compareAtPriceRange {
            maxVariantPrice {
              amount
            }
            minVariantPrice {
              amount
            }
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`

export const productsQueryByTitles = `
  query productsQuery($titlesQuery: String!) {
    products(first: 6, query:$titlesQuery) {
      edges {
        node {
          id
          title
          slug: handle
          brand: metafield(namespace: "custom", key: "brand") {
            value
          }
          featuredImage {
            url
          }
          priceRange {
            maxVariantPrice {
              amount
            }
            minVariantPrice {
              amount
            }
          }
          compareAtPriceRange {
            maxVariantPrice {
              amount
            }
            minVariantPrice {
              amount
            }
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
      }
    }
  }
  `

export const productQuery = `
  query productQuery($handle: String!) {
    product(handle: $handle) {
        title
        description
        descriptionHtml
        variants(first:1){
          edges{
            node {
              id
              title
            }
          }
        }
        seo {
          title
          description
        }
        featuredImage {
            url
        }
        priceRange {
            maxVariantPrice {
                amount
            }
            minVariantPrice {
                amount
            }
        }
        compareAtPriceRange {
            maxVariantPrice {
              amount
            }
            minVariantPrice {
              amount
            }
        }
        vendor
        brand: metafield(namespace: "custom", key: "brand") {
            value
            type
        }
        range: metafield(namespace: "custom", key: "range") {
            value
            type
        }
        finish: metafield(namespace: "custom", key: "finish") {
            value
            type
        }
        material: metafield(namespace: "custom", key: "material") {
            value
            type
        }
        sizeDiameter: metafield(namespace: "custom", key: "size_diameter") {
            value
            type
        }
        cutOutDiameter: metafield(namespace: "custom", key: "cut_out_diameter") {
            value
            type
        }
        height: metafield(namespace: "custom", key: "size_height") {
            value
            type
        }
        width: metafield(namespace: "custom", key: "size_width") {
            value
            type
        }
        projection: metafield(namespace: "custom", key: "projection") {
            value
            type
        }
        lampSocketType: metafield(namespace: "custom", key: "lamp_socket_type") {
            value
            type
        }
        inputVoltage: metafield(namespace: "custom", key: "input_voltage") {
            value
            type
        }
        electricalClass: metafield(namespace: "custom", key: "electrical_class") {
            value
            type
        }
        numberOfLamps: metafield(namespace: "custom", key: "number_of_lamps") {
            value
            type
        }
        wattage: metafield(namespace: "custom", key: "wattage") {
            value
            type
        }
        maxWattage: metafield(namespace: "custom", key: "max_wattage") {
            value
            type
        }
        lumens: metafield(namespace: "custom", key: "lumens") {
            value
            type
        }
        colourTemperature: metafield(namespace: "custom", key: "colour_temperature") {
            value
            type
        }
        integratedSwtich: metafield(namespace: "custom", key: "integrated_swtich") {
            value
            type
        }
        minimumRecessDepth: metafield(namespace: "custom", key: "minimum_recess_depth") {
            value
            type
        }
        dimmable: metafield(namespace: "custom", key: "dimmable") {
            value
            type
        }
        lampsSupplied: metafield(namespace: "custom", key: "lamps_supplied") {
            value
            type
        }
        ipRating: metafield(namespace: "custom", key: "ip_rating") {
            value
            type
        }
        iscCode: metafield(namespace: "custom", key: "isc_code") {
            value
            type
        }
        slug: metafield(namespace: "custom", key: "slug") {
            value
            type
        }
      id      
    }
}
`

export const collectionByHandleQuery = `
  query getCollectionByHandle($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      title
      handle
      description
      metafield(namespace: "custom", key: "parent_collection") {
        value
      }
      products(first: 24) {
              edges {
        node {
          id
          title
          slug: handle
          brand: metafield(namespace: "custom", key: "brand") {
            value
          }
          featuredImage {
            url
          }
          priceRange {
            maxVariantPrice {
              amount
            }
            minVariantPrice {
              amount
            }
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
      }
      }
    }
  }
    `

export const collectionByIdQuery = `
  query getCollectionById($id: ID!) {
    collection(id: $id) {
      id
      title
      handle
      metafield(namespace: "custom", key: "parent_collection") {
        value
      }
    }
  }
`

/**
 * Query to fetch a collection by metafield
 * @param key - The metafield key
 * @param value - The metafield value
 */
export const collectionByMetafieldQuery = `
  query getCollectionByMetafield($key: String!, $value: String!){
    collection(handle: "all-products") {
      handle
      products(first: 24, filters:{
        productMetafield:{
          namespace: "custom",
          key: $key,
          value: $value
        }
      }) {
        edges {
          node {
            id
            title
            slug: handle
            brand: metafield(namespace: "custom", key: "brand") {
              value
            }
            featuredImage {
              url
            }
            priceRange {
              maxVariantPrice{
                amount
              }
              minVariantPrice{
                amount
              }
            }
          }
          cursor
        }
        pageInfo{
          hasNextPage
        }
        
      }
    }
  }`

/**
 * Query to fetch a collection with filters
 * @param handle - The collection handle
 * @param filters - The filters to apply
 */
export const getCollectionWithFilters = `
  query getCollectionWithFilters($handle: String = "all-products", $filters: [ProductFilter!] = []) {
    collection(handle: $handle) {
      handle
      products(first: 24, filters: $filters) {
        edges {
          node {
            id
            title
            slug: handle
            brand: metafield(namespace: "custom", key: "brand") {
              value
            }
            featuredImage {
              url
            }
            priceRange {
              maxVariantPrice{
                amount
              }
              minVariantPrice{
                amount
              }
            }
          }
          cursor
        }
        pageInfo{
          hasNextPage
        }
        
      }
    }
  }`

/**
 * Query to fetch products with a specific metafield
 * @param after - The cursor to start from
 * @param key - The metafield key
 */
export const productsWithMetafieldQuery = `
    query productsWithMetafield($after: String, $key: String!) {
    products(first: 250, after: $after) {
      edges {
        node {
          updatedAt
          handle
          metafield(namespace: "custom", key: $key) {
            value
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

export const allCollectionsQuery = `
    query collectionQuery($after: String) {
    collections(first: 250, after: $after) {
      edges {
        node {
          id
          handle
          updatedAt
          title
          metafield(namespace: "custom", key: "parent_collection") {
            value
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

export const allProductsQuery = `
    query productQuery($after: String) {
      products(first: 250, after: $after) {
        edges {
          node {
            handle
            updatedAt
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `
