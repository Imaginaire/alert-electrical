import {defineField, defineType} from 'sanity'
import {customBlock} from '../partials/customBlock'

export const ctaType = defineType({
  name: 'cta',
  title: 'CTA',
  type: 'object',
  fields: [
    defineField({
      type: 'array',
      name: 'content',
      title: 'Content',
      of: [customBlock],
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'string',
      name: 'linkText',
      title: 'Link Text',
    }),
    defineField({
      type: 'reference',
      name: 'link',
      title: 'Link',
      to: [{type: 'page'}, {type: 'shop'}],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'CTA',
      }
    },
  },
})
