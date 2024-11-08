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
