import {defineArrayMember, defineField, defineType} from 'sanity'
import {GROUPS} from '../../constants'
import {customBlock} from '../objects/partials/customBlock'

const TITLE = 'Product Page'

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
    defineField({
      name: 'masterRobots',
      title: 'Master Robots',
      description:
        'Used for the <meta> robots tag for SEO. Unless you have specified a page specific robots meta, this will be used as a fallback.',
      type: 'object',
      group: 'seo',
      options: {
        columns: 2,
      },
      fields: [
        defineField({
          name: 'noindex',
          title: 'No Index',
          type: 'boolean',
          description: 'Discourages search engines from indexing page.',
          initialValue: false,
        }),
        defineField({
          name: 'nofollow',
          title: 'No Follow',
          type: 'boolean',
          description: 'Discourages search engines from following links.',
          initialValue: false,
        }),
        defineField({
          name: 'noarchive',
          title: 'No Archive',
          type: 'boolean',
          description: 'Prevents search engines from showing a cached links for pages.',
          initialValue: false,
        }),
        defineField({
          name: 'noimageindex',
          title: 'No Image Index',
          type: 'boolean',
          description: 'Prevents search engines from indexing images.',
          initialValue: false,
        }),
        defineField({
          name: 'nosnippet',
          title: 'No Snippet',
          type: 'boolean',
          description: 'Prevents search engines from showing a snippet.',
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: 'productSpecificRobots',
      title: 'Product Specific Robots',
      type: 'array',
      group: 'seo',
      description:
        'Used for the <meta> robots tag for SEO. This will override the master robots meta. Ensure you add the correct product title',
      of: [
        defineArrayMember({
          name: 'productRobots',
          type: 'object',
          title: 'Product Robots',
          fields: [
            defineField({
              name: 'productTitle',
              type: 'string',
              title: 'Product Title',
              description: 'The title of the product that this robots meta should be applied to.',
            }),
            defineField({
              name: 'noindex',
              title: 'No Index',
              type: 'boolean',
              description: 'Discourages search engines from indexing page.',
              initialValue: false,
            }),
            defineField({
              name: 'nofollow',
              title: 'No Follow',
              type: 'boolean',
              description: 'Discourages search engines from following links.',
              initialValue: false,
            }),
            defineField({
              name: 'noarchive',
              title: 'No Archive',
              type: 'boolean',
              description: 'Prevents search engines from showing a cached links for pages.',
              initialValue: false,
            }),
            defineField({
              name: 'noimageindex',
              title: 'No Image Index',
              type: 'boolean',
              description: 'Prevents search engines from indexing images.',
              initialValue: false,
            }),
            defineField({
              name: 'nosnippet',
              title: 'No Snippet',
              type: 'boolean',
              description: 'Prevents search engines from showing a snippet.',
              initialValue: false,
            }),
          ],
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
