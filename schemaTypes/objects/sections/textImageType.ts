import {defineArrayMember, defineField, defineType} from 'sanity'

export const textImageType = defineType({
  name: 'textImage',
  title: 'Text Image',
  type: 'object',
  fields: [
    defineField({
      type: 'array',
      name: 'content',
      title: 'Content',
      of: [defineArrayMember({type: 'block'})],
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'string',
      name: 'imagePosition',
      title: 'Image Position',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'right',
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
