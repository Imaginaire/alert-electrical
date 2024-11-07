import {defineField, defineType} from 'sanity'

export const serviceAreasType = defineType({
  name: 'serviceAreas',
  title: 'Service Areas',
  type: 'object',
  fields: [
    defineField({
      name: 'services',
      title: 'services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
            }),
            defineField({
              name: 'mainLink',
              title: 'Main Link',
              type: 'object',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Text',
                  type: 'string',
                }),
                defineField({
                  name: 'slug',
                  title: 'URL',
                  type: 'slug',
                }),
              ],
            }),
            defineField({
              name: 'textLinks',
              title: 'Text Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Text',
                      type: 'string',
                    }),
                    defineField({
                      name: 'slug',
                      title: 'URL',
                      type: 'slug',
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Service Areas',
      }
    },
  },
})
