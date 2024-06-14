import {BasketIcon} from '@sanity/icons'
import {GROUPS} from '../../constants'
import {defineField, defineType} from 'sanity'
import {seo} from '../partials/seo'
import {sections} from '../partials/sections'

export const cartType = defineType({
  name: 'cart',
  title: 'Cart',
  type: 'document',
  icon: BasketIcon,
  groups: GROUPS,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your cart page.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'This is the URL path for your cart page.',
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
        media: BasketIcon,
        subtitle: 'Index',
        title: 'Cart',
      }
    },
  },
})
