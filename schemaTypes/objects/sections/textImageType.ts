import {defineArrayMember, defineField, defineType} from 'sanity'

export const textImageType = defineType({
  name: 'textImage',
  title: 'Text Image',
  type: 'object',
  fields: [
    defineField({
      type: 'string',
      name: 'header',
      title: 'Header',
    }),
    defineField({
      type: 'array',
      name: 'description',
      title: 'Description',
      of: [defineArrayMember({type: 'block'})],
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'array',
      name: 'images',
      title: 'Images',
      description: 'Add up to 2 images',
      of: [defineArrayMember({type: 'image'})],
      validation: (rule) => rule.required().max(2),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Text Image',
      }
    },
  },
})
