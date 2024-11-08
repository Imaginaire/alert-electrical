import {defineType, defineField} from 'sanity'
import {GROUPS} from '../../constants'
import {sections} from '../partials/sections'
import {seo} from '../partials/seo'

export const buyersGuideType = defineType({
  type: 'document',
  name: 'buyersGuide',
  title: 'Buyers Guide',
  groups: GROUPS,
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => [
        Rule.required(),
        Rule.custom((slug) => {
          // if slug starts with / return warning
          if (slug?.current?.startsWith('/')) {
            return 'Slug cannot start with /, this is generated automatically.'
          }

          if (slug?.current?.endsWith('/')) {
            return 'Slug cannot end with /, this is generated automatically.'
          }

          return true
        }),
      ],
    }),
    defineField({
      type: 'date',
      name: 'date',
      title: 'Date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'image',
      name: 'image',
      title: 'Image',
      validation: (rule) => rule.required(),
    }),
    seo,
    sections,
  ],
})
