import {defineField, defineType} from 'sanity'

export const shortcodesType = defineType({
  type: 'document',
  name: 'shortcodes',
  title: 'Shortcodes',
  description:
    'Shortcodes that can be used across the WYSIWYG editor. Add the shortcode as [shortcode] in the editor and then select the shortcode button in the toolbar to add the value.',
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
              description:
                'The shortcode to use in the editor, remember to wrap it in square brackets [shortcode]',
              // validation rule to make sure its wrapped in square brackets
              validation: (rule) => rule.regex(/\[.*\]/),
            }),
            defineField({
              type: 'string',
              name: 'value',
              title: 'Value',
              description: 'The value that will be replaced on the frontend',
            }),
          ],
        }),
      ],
    }),
  ],
})
