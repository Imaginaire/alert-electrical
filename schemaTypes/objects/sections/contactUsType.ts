import {defineType, defineField} from 'sanity'
import {customBlock} from '../partials/customBlock'
import formBuilderType from './formBuilderType/formBuilderType'

export const contactUsType = defineType({
  name: 'contactUs',
  title: 'Contact Us',
  type: 'object',
  fields: [
    defineField({
      type: 'object',
      name: 'emailDetails',
      title: 'Email Details',
      fields: [
        defineField({name: 'emailDetailsContent', type: 'array', of: [customBlock]}),
        defineField({name: 'emailLink', title: 'Email Link', type: 'string'}),
        defineField({name: 'emailLinkText', type: 'string', title: 'Email Link Text'}),
      ],
    }),
    defineField({
      name: 'phoneDetails',
      title: 'Phone Details',
      type: 'object',
      fields: [
        defineField({name: 'phoneDetailsContent', type: 'array', of: [customBlock]}),
        defineField({name: 'phoneLink', title: 'Phone Link', type: 'string'}),
        defineField({name: 'phoneLinkText', type: 'string', title: 'Phone Link Text'}),
      ],
    }),
    defineField(formBuilderType),
  ],
})
