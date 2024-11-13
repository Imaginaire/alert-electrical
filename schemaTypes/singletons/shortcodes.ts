import {defineField, defineType} from 'sanity'

export const shortcodesType = defineType({
  type: 'document',
  name: 'shortcodes',
  title: 'Shortcodes',
  fields: [
    defineField({
      type: 'array',
      name: 'shortcodes',
      title: 'Shortcodes',
      of: [
        defineField({
          type: 'object',
          name: 'shortcode',
          title: 'Shortcode',
          fields: [
            defineField({
              type: 'string',
              name: 'shortcode',
              title: 'Shortcode',
            }),
            defineField({
              type: 'string',
              name: 'value',
              title: 'Value',
            }),
          ],
        }),
      ],
    }),
  ],
})
