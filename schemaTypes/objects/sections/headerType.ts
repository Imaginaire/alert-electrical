import {defineField, defineType} from 'sanity'

export const headerType = defineType({
  name: 'header',
  title: 'Header',
  type: 'object',
  fields: [
    defineField({
      name: 'header',
      type: 'string',
      title: 'Header',
      description: 'The header text',
    }),
    defineField({
      name: 'subHeader',
      type: 'string',
      title: 'Sub Header',
      description: 'The sub header text',
    }),
  ],
})
