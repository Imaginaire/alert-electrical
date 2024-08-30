import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'news',
  title: 'News',
  type: 'object',
  description: 'Displays a list of news articles.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'News',
      }
    },
  },
})
