import {defineType, defineField} from 'sanity'
import {GROUPS} from '../../constants'
import {seo} from '../partials/seo'
import {shortHeroType} from '../objects/sections/shortHeroType'

export const finishType = defineType({
  type: 'document',
  name: 'finish',
  title: 'Finish Pages',
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
        'This is the slug after /finish/ in the URL. Changing this will not change the URL of the page. This is used to map the page to the finish from Shopify.',
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
