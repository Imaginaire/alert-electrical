import {defineField, defineType} from 'sanity'
import {customBlock} from '../partials/customBlock'

export const textMapType = defineType({
  name: 'textMap',
  title: 'Text Map',
  type: 'object',
  fields: [
    defineField({
      type: 'string',
      name: 'sectionTitle',
      title: 'Section Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'array',
      name: 'description',
      title: 'Description',
      of: [customBlock],
    }),
    defineField({
      type: 'boolean',
      name: 'showPhoneNumber',
      title: 'Show Phone Number',
    }),
    defineField({
      type: 'string',
      name: 'phoneNumberCaption',
      title: 'Phone Number Caption',
      description: 'Caption to display next to the phone number',
      hidden: ({parent}) => {
        return !(parent?.showPhoneNumber === true)
      },
    }),
    defineField({
      type: 'boolean',
      name: 'showEmail',
    }),
    defineField({
      type: 'string',
      name: 'emailCaption',
      title: 'Email Caption',
      description: 'Caption to display next to the email',
      hidden: ({parent}) => {
        return !(parent?.showEmail === true)
      },
    }),
    defineField({
      type: 'string',
      name: 'addressTitle',
      title: 'Address Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'string',
      name: 'openingHoursTitle',
      title: 'Opening Hours Title',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Text Map',
      }
    },
  },
})
