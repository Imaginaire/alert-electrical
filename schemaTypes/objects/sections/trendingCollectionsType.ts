import {defineArrayMember, defineField, defineType} from 'sanity'
import {headerType} from './headerType'

export const trendingCollectionsType = defineType({
  name: 'trendingCollections',
  title: 'Trending Collections',
  type: 'object',
  fields: [
    defineField(headerType),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'reference',
      to: [{type: 'page'}, {type: 'shop'}],
    }),
    defineField({
      name: 'linkText',
      title: 'Link Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'trendingCollection',
          title: 'Trending Collection',
          fields: [
            defineField({
              type: 'string',
              name: 'title',
              title: 'Title',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
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
              to: [{type: 'page'}],
              //   validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'linkText',
            },
            prepare({title, subtitle}) {
              return {
                title: title,
                subtitle: `Link: ${subtitle}`,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'collections.0.title',
    },
    prepare({title}) {
      return {
        title: title ? `Trending Collections: ${title} etc.` : 'Trending Collections',
      }
    },
  },
})
