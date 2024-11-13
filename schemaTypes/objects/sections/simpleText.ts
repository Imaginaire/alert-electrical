import {defineType, defineField} from 'sanity'
import {customBlock} from '../partials/customBlock'

export const simpleTextType = defineType({
  name: 'simpleText',
  title: 'Simple Text',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [customBlock],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Simple Text',
      }
    },
  },
})
