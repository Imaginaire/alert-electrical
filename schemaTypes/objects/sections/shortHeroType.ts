import {defineField, defineType} from 'sanity'
import {customBlock} from '../partials/customBlock'

export const shortHeroType = defineType({
  name: 'shortHero',
  title: 'Short Hero',
  type: 'object',
  fields: [
    defineField({
      type: 'string',
      name: 'header',
      title: 'Header',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'array',
      name: 'description',
      title: 'Description',
      of: [customBlock],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Short Hero',
      }
    },
  },
})
