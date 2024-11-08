import {defineType, defineField} from 'sanity'

export const ourTopBrandsType = defineType({
  name: 'ourTopBrands',
  title: 'Our Top Brands',
  type: 'object',
  description: 'Displays a list of our top brands.',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
            },
            {
              name: 'slug',
              title: 'URL',
              type: 'slug',
              description: 'Link to the brand website',
            },
          ],
          preview: {
            select: {
              slug: 'slug.current',
              media: 'image',
            },
            prepare({slug, media}) {
              return {
                title: `Brand image for ${slug || 'no URL'}`,
                media,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Our Top Brands',
      }
    },
  },
})
