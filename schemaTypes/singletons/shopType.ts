import {defineField, defineType} from 'sanity'
import {GROUPS} from '../../constants'
import {seo} from '../partials/seo'
import {sections} from '../partials/sections'
import {ThListIcon} from '@sanity/icons'

export const shopType = defineType({
  name: 'shop',
  title: 'Shop',
  type: 'document',
  icon: ThListIcon,
  groups: GROUPS,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your shop.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'This is the URL path for your shop.',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    seo,
    sections,
  ],
  preview: {
    prepare() {
      return {
        media: ThListIcon,
        subtitle: 'Index',
        title: 'Shop',
      }
    },
  },
})
