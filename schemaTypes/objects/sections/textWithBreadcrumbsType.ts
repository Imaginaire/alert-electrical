import {defineType, defineField} from 'sanity'
import {customBlock} from '../partials/customBlock'

export const textWithBreadcrumbsType = defineType({
  type: 'object',
  name: 'textWithBreadcrumbs',
  title: 'Text with Breadcrumbs',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [customBlock],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Text with Breadcrumbs',
      }
    },
  },
})
