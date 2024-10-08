import {defineType, defineField, defineArrayMember} from 'sanity'
import {headerType} from './headerType'

export const browseProductsType = defineType({
  name: 'browseProducts',
  title: 'Browse Products',
  type: 'object',
  fields: [
    defineField(headerType),
    defineField({
      name: 'headerLinkText',
      title: 'Header Link Text',
      type: 'string',
    }),
    defineField({
      name: 'headerLink',
      title: 'Header Link',
      type: 'slug',
    }),
    defineField({
      name: 'newInFallback',
      title: 'New In Fallback',
      type: 'boolean',
    }),
    defineField({
      name: 'bestSellersFallback',
      title: 'Best Sellers Fallback',
      type: 'boolean',
    }),
    defineField({
      name: 'menuItems',
      title: 'Menu Items',
      type: 'array',
      description:
        "The 'New In' and 'Best Sellers' are pulled from Shopify depending on the latest new products and best selling products. If 'New In Fallback' or 'Best Sellers Fallback' are set, it will use the 'New In' and 'Best Sellers' collections instead.",
      of: [
        defineArrayMember({
          type: 'object',
          name: 'menuItem',
          title: 'menuItem',
          fields: [
            defineField({
              type: 'string',
              name: 'title',
              title: 'Title',
              validation: (rule) => rule.required(),
            }),
            defineField({
              type: 'string',
              name: 'product1Handle',
              title: 'Product 1 Handle',
              description:
                'The handle of the product you want to link to. This is the part of the URL that comes after /products/. in the Shopify admin panel.',
            }),
            defineField({
              type: 'string',
              name: 'product2Handle',
              title: 'Product 2 Handle',
              description:
                'The handle of the product you want to link to. This is the part of the URL that comes after /products/. in the Shopify admin panel.',
            }),
            defineField({
              type: 'string',
              name: 'product3Handle',
              title: 'Product 3 Handle',
              description:
                'The handle of the product you want to link to. This is the part of the URL that comes after /products/. in the Shopify admin panel.',
            }),
            defineField({
              type: 'string',
              name: 'product4Handle',
              title: 'Product 4 Handle',
              description:
                'The handle of the product you want to link to. This is the part of the URL that comes after /products/. in the Shopify admin panel.',
            }),
            defineField({
              type: 'string',
              name: 'product5Handle',
              title: 'Product 5 Handle',
              description:
                'The handle of the product you want to link to. This is the part of the URL that comes after /products/. in the Shopify admin panel.',
            }),
            defineField({
              type: 'string',
              name: 'product6Handle',
              title: 'Product 6 Handle',
              description:
                'The handle of the product you want to link to. This is the part of the URL that comes after /products/. in the Shopify admin panel.',
            }),
          ],
        }),
      ],
    }),
  ],
})
