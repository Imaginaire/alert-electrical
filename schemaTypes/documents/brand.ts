import {defineField, defineType} from 'sanity'
import {GROUPS} from '../../constants'
import {customBlock} from '../objects/partials/customBlock'
import {seo} from '../partials/seo'
import {shortHeroType} from '../objects/sections/shortHeroType'

export const brandType = defineType({
  type: 'document',
  name: 'brand',
  title: 'Brand Pages',
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
      description:
        'This is the slug after /brand/ in the URL. Changing this will not change the URL of the page. This is used to map the page to the brand from Shopify.',
      options: {
        source: 'title',
      },
    }),
    defineField(shortHeroType),
    seo,
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
