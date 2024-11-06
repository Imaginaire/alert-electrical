import {defineArrayMember, defineField, defineType} from 'sanity'
import {customBlock} from '../partials/customBlock'

// Reusable hero fields object
const heroFields = [
  defineField({
    type: 'array',
    name: 'content',
    title: 'Content',
    of: [customBlock],
    validation: (rule) => rule.required(),
  }),
  defineField({
    type: 'image',
    name: 'backgroundImage',
    title: 'Background Image',
    fields: [
      defineField({
        type: 'string',
        name: 'alt',
        title: 'Alt Text',
      }),
    ],
    validation: (rule) => rule.required(),
  }),
  defineField({
    type: 'string',
    name: 'linkText',
    title: 'Link Text',
    validation: (rule) => rule.required(),
  }),
  defineField({
    type: 'reference',
    name: 'link',
    title: 'Link',
    to: [{type: 'page'}, {type: 'shop'}],
    validation: (rule) => rule.required(),
  }),
]

export const heroType = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'useSwiper',
      title: 'Use Swiper',
      type: 'boolean',
      description: 'Enable to rotate heroes in a swiper',
      initialValue: false, // Default is no swiper
    }),
    // Single Hero fields (conditionally displayed if useSwiper is false)
    ...heroFields.map((field) => ({
      ...field,
      hidden: ({parent}: {parent: {useSwiper: boolean}}) => parent?.useSwiper === true,
      validation: (rule: {required: () => any}) => (parent?.useSwiper ? rule : rule.required()), // Conditional validation
    })),
    // Array of Hero fields (conditionally displayed if useSwiper is true)
    defineField({
      name: 'heros',
      title: 'Heros',
      type: 'array',
      hidden: ({parent}) => parent?.useSwiper === false, // Hidden if swiper is not enabled
      of: [
        defineArrayMember({
          type: 'object',
          name: 'heroItem',
          title: 'Hero Item',
          fields: heroFields.map((field) => ({
            ...field,
            validation: (rule) => rule.required(), // Validation always required in array
          })),
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Hero',
      }
    },
  },
})
