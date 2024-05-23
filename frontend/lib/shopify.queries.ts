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
