import {defineType, defineField} from 'sanity'
import {headerType} from './headerType'
import {customBlock} from '../partials/customBlock'
import {simpleTextType} from './simpleText'

export const officeInfoType = defineType({
  name: 'officeInfo',
  title: 'Office Info',
  type: 'object',
  fields: [
    defineField({
      name: 'officeCard',
      title: 'Office Card',
      type: 'object',
      fields: [
        defineField(headerType),
        defineField({
          title: 'image',
          name: 'image',
          type: 'image',
        }),
        defineField({
          title: 'Content',
          name: 'content',
          type: 'array',
          of: [customBlock],
        }),
        defineField({
          title: 'Additional Content',
          name: 'additionalContent',
          description: 'This is the content that is displayed below in the blue section',
          type: 'array',
          of: [customBlock],
        }),
      ],
    }),
    defineField({
      name: 'branchesCard',
      title: 'Branches Card',
      type: 'object',
      fields: [
        defineField(headerType),
        defineField({
          name: 'branches',
          title: 'Branches',
          type: 'array',
          of: [
            defineField({
              type: 'object',
              name: 'branch',
              title: 'Branch',
              fields: [
                defineField({
                  type: 'array',
                  name: 'branchContent',
                  title: 'Branch Content',
                  of: [customBlock],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Office Info',
      }
    },
  },
})
