import {defineField, defineType} from 'sanity'
import {customBlock} from '../../partials/customBlock'

export const postContentType = defineType({
  type: 'object',
  name: 'postContent',
  title: 'Post Content',
  fields: [
    defineField({
      type: 'array',
      name: 'content',
      title: 'Content',
      of: [
        customBlock,
        {
          type: 'image',
          fields: [defineField({type: 'string', name: 'alt', title: 'Alt Text'})],
        },
        {type: 'imageGallery'},
      ],
    }),
    defineField({
      name: 'width',
      type: 'number',
      title: 'Width',
      options: {
        list: [
          {title: 'Full', value: 91.666667},
          {title: '3/4', value: 75},
          {title: '3/5', value: 60},
          {title: '1/2', value: 50},
        ],
      },
    }),
    defineField({
      name: 'backgroundColour',
      title: 'Background Colour',
      type: 'color',
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      name: 'padding',
      title: 'Padding',
      description: 'Padding in pixels',
      type: 'number',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Post Content',
      }
    },
  },
})
