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
              name: 'product1Title',
              title: 'Product 1 Title',
              description:
                'The title of the product that you want to display. This can be found on the Shopify product page.',
            }),
            defineField({
              type: 'string',
              name: 'product2Title',
              title: 'Product 2 Title',
            }),
            defineField({
              type: 'string',
              name: 'product3Title',
              title: 'Product 3 Title',
            }),
            defineField({
              type: 'string',
              name: 'product4Title',
              title: 'Product 4 Title',
            }),
            defineField({
              type: 'string',
              name: 'product5Title',
              title: 'Product 5 Title',
            }),
            defineField({
              type: 'string',
              name: 'product6Title',
              title: 'Product 6 Title',
            }),
          ],
        }),
      ],
    }),
  ],
})
