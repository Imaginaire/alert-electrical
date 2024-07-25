import {DocumentIcon, ImageIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import toStringFromCamelCase from '../../utils/toStringFromCamelCase'
import {GROUPS} from '../../constants'
import {sections} from '../partials/sections'
import {seo} from '../partials/seo'

export const pageType = defineType({
  type: 'document',
  name: 'page',
  title: 'Page',
  groups: GROUPS,
  icon: DocumentIcon,
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
      type: 'reference',
      name: 'parent',
      title: 'Parent',
      to: [{type: 'page'}],
    }),
    defineField({
      type: 'string',
      name: 'pageType',
      title: 'Page Type',
      description: 'Used to determine the page purpose. For example, "blog" or "caseStudy".',
      options: {
        list: [
          {title: 'Blog', value: 'blog'},
          {title: 'Case Studies', value: 'caseStudies'},
          {title: 'Standard Page', value: 'page'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    seo,
    sections,
  ],
  preview: {
    select: {
      title: 'title',
      pageType: 'pageType',
      parent: 'parent.title',
    },
    prepare({title, pageType, parent}) {
      if (pageType !== 'page') return {title, subtitle: toStringFromCamelCase(pageType)}
      return {
        subtitle: 'Page' + (parent ? ` - ${parent}` : ''),
        title,
      }
    },
  },
})
