import {defineField, defineType} from 'sanity'

export const embedType = defineType({
  name: 'embed',
  title: 'Embed',
  type: 'object',
  fields: [
    defineField({
      name: 'html',
      title: 'HTML',
      description: 'HTML content to display on the page',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      html: 'html',
    },
    prepare(selection) {
      return {
        title: 'Embed',
        subtitle: selection.html,
      }
    },
  },
})
