import {defineType, defineField} from 'sanity'

export const imageGalleryType = defineType({
  type: 'object',
  name: 'imageGallery',
  title: 'Image Gallery',
  fields: [
    defineField({
      type: 'array',
      name: 'images',
      title: 'Images',
      of: [
        {
          type: 'image',
        },
      ],
    }),
    defineField({
      name: 'gridRows',
      type: 'number',
      title: 'Grid Rows',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Gallery',
      }
    },
  },
})
