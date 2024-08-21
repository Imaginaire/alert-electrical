import {defineArrayMember, defineField, defineType} from 'sanity'

export const ctaBannerType = defineType({
  name: 'ctaBanner',
  title: 'CTA Banner',
  type: 'object',
  fields: [
    defineField({
      name: 'leftText',
      type: 'string',
      title: 'Left Text',
    }),
    defineField({
      name: 'middleText',
      type: 'string',
      title: 'Middle Text',
    }),
    defineField({
      name: 'rightText',
      type: 'string',
      title: 'Right Text',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'CTA Banner',
      }
    },
  },
})
