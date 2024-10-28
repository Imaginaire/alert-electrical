import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'formFields',
  title: 'Form Fields',
  type: 'object',
  fields: [
    defineField({
      name: 'required',
      title: 'Required',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'fieldName',
      title: 'Field Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'fieldId',
      title: 'Field Id',
      type: 'slug',
      description: 'This is the id that will be used in the formspark form.',
      options: {
        maxLength: 200,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'inputType',
      title: 'Input Type',
      type: 'string',
      initialValue: 'text',
      options: {
        layout: 'dropdown',
        list: [
          {value: 'text', title: 'Text input'},
          {value: 'email', title: 'Email'},
          {value: 'phone', title: 'Phone number'},
          {value: 'textArea', title: 'Text area'},
          {value: 'file', title: 'File upload'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      inputType: 'inputType',
    },
    prepare({inputType}) {
      const title =
        inputType === 'text'
          ? 'Text input'
          : inputType === 'email'
            ? 'Email'
            : inputType === 'phone'
              ? 'Phone number'
              : inputType === 'textArea'
                ? 'Text area'
                : inputType === 'file'
                  ? 'File upload'
                  : 'Unknown'

      return {
        title: `Form Field: ${title}`,
      }
    },
  },
})
