import {defineField, defineType} from 'sanity'
import {customBlock} from '../partials/customBlock'

export const largeCtaType = defineType({
  name: 'largeCta',
  title: 'Large CTA',
  type: 'object',
  fields: [
    defineField({
      type: 'string',
      name: 'header',
      title: 'Header',
      validation: (rule) => rule.required(),
    }),

    defineField({
      type: 'array',
      name: 'description',
      title: 'Description',
      of: [customBlock],
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'image',
      name: 'backgroundImage',
      title: 'Background Image',
      fields: [
        defineField({
          type: 'string',
          name: 'alt',
          title: 'Alt Text',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'string',
      name: 'linkText',
      title: 'Link Text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'reference',
      name: 'link',
      title: 'Link',
      validation: (rule) => rule.required(),
      to: [{type: 'page'}],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Large CTA',
      }
    },
  },
})
