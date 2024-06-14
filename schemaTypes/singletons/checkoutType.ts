import {ThListIcon} from '@sanity/icons'
import {GROUPS} from '../../constants'
import {defineField, defineType} from 'sanity'
import {seo} from '../partials/seo'
import {sections} from '../partials/sections'

export const checkoutType = defineType({
  name: 'checkout',
  title: 'Checkout',
  type: 'document',
  icon: ThListIcon,
  groups: GROUPS,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your checkout page.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'This is the URL path for your checkout page.',
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
        title: 'Checkout',
      }
    },
  },
})
