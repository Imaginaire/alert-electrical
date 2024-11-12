import {defineField, defineType} from 'sanity'

export const customTableType = defineType({
  name: 'customTable',
  title: 'Custom Table',
  type: 'object',
  fields: [
    defineField({
      name: 'customTable',
      type: 'table',
      title: 'Custom Table',
      description: 'The custom table',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Custom Table',
      }
    },
  },
})
