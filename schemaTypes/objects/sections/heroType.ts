import {defineArrayMember, defineField, defineType} from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      type: 'string',
      name: 'header',
      title: 'Header',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'string',
      name: 'subheader',
      title: 'Subheader',
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
      title: 'Link ',
      validation: (rule) => rule.required(),
      to: [{type: 'page'}],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Hero',
      }
    },
  },
})
