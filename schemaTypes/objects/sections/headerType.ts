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
      name: 'headerTag',
      type: 'string',
      title: 'Header Tag',
      description: 'The header tag',
      options: {
        list: [
          {title: 'H1', value: 'h1'},
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'H4', value: 'h4'},
          {title: 'H5', value: 'h5'},
          {title: 'H6', value: 'h6'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      header: 'header',
      headerTag: 'headerTag',
    },
    prepare(selection) {
      return {
        title: 'Header',
        subtitle: selection.header,
      }
    },
  },
})
