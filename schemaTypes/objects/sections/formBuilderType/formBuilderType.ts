import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'formBuilder',
  title: 'Form Builder',
  type: 'object',
  fields: [
    defineField({
      type: 'string',
      name: 'formId',
      title: 'Formspark Form ID',
      description: 'The ID of the form you want to use. Found on the formspark dashboard.',
    }),
    defineField({
      type: 'string',
      name: 'formName',
      title: 'Form Name',
    }),
    defineField({
      type: 'image',
      name: 'formImage',
      title: 'Form Image',
    }),
    defineField({
      name: 'formFields',
      title: 'Form Fields',
      type: 'array',
      of: [{type: 'formFields'}],
    }),
    defineField({
      name: 'useCaptcha',
      title: 'Use Captcha',
      type: 'boolean',
    }),
    defineField({
      name: 'captchaSiteKey',
      title: 'Captcha Site Key',
      type: 'string',
      description: 'The site key for the captcha. Found on the hCaptcha dashboard.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Form Builder',
      }
    },
  },
})
