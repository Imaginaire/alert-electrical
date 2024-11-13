import {defineField, defineType} from 'sanity'
import {headerType} from './headerType'

export const headerStrapType = defineType({
  name: 'headerStrap',
  title: 'Header Strap',
  type: 'object',
  fields: [defineField(headerType)],
  preview: {
    prepare() {
      return {
        title: 'Header Strap',
      }
    },
  },
})
