import {defineField, defineType} from 'sanity'
import {GROUPS} from '../../constants'
import {customBlock} from '../objects/partials/customBlock'

const TITLE = 'Product Setting'

export const productSettingType = defineType({
  name: 'productSetting',
  title: TITLE,
  type: 'document',
  groups: GROUPS,
  fields: [
    defineField({
      name: 'warranty',
      title: 'Warranty',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'delivery',
      title: 'Delivery',
      type: 'array',
      of: [customBlock],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'object',
      options: {
        collapsible: true,
      },
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
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
