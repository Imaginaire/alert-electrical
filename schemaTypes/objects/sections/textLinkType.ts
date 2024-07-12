import {defineType, defineField} from 'sanity'
// import { customBlock } from 'schemas/partials/customBlock'

export const textLinkType = defineType({
  type: 'object',
  name: 'textLink',
  title: 'Text Link',
  fields: [
    defineField({
      type: 'string',
      name: 'header',
      title: 'Header',
    }),
    // defineField({
    //   name: 'content',
    //   title: 'Content',
    //   type: 'array',
    //   of: [customBlock],
    // }),
    defineField({
      type: 'string',
      name: 'linkText',
      title: 'Link Text',
    }),

    defineField({
      type: 'reference',
      name: 'link',
      title: 'Link ',
      to: [{type: 'page'}],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Text Link',
      }
    },
  },
})
