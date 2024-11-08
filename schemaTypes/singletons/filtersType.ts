import {defineField, defineType} from 'sanity'
import {GROUPS} from '../../constants'

const TITLE = 'Filters'

export const filtersType = defineType({
  name: 'filters',
  title: TITLE,
  type: 'document',
  groups: GROUPS,
  fields: [
    defineField({
      name: 'interiorLightingCategories',
      title: 'Interior Lighting Categories',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'category',
          fields: [
            defineField({
              title: 'Title',
              name: 'title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              title: 'Link',
              name: 'link',
              type: 'slug',
              options: {
                source: 'title',
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'subCategories',
              title: 'Sub-categories',
              type: 'array',
              of: [
                defineField({
                  type: 'object',
                  name: 'subCategory',
                  fields: [
                    defineField({
                      title: 'Title',
                      name: 'title',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      title: 'Link',
                      name: 'link',
                      type: 'slug',
                      options: {
                        source: 'title',
                      },
                      validation: (rule) => rule.required(),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'exteriorLightingCategories',
      title: 'Exterior Lighting Categories',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'category',
          fields: [
            defineField({
              title: 'Title',
              name: 'title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              title: 'Link',
              name: 'link',
              type: 'slug',
              options: {
                source: 'title',
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'subCategories',
              title: 'Sub-categories',
              type: 'array',
              of: [
                defineField({
                  type: 'object',
                  name: 'subCategory',
                  fields: [
                    defineField({
                      title: 'Title',
                      name: 'title',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      title: 'Link',
                      name: 'link',
                      type: 'slug',
                      options: {
                        source: 'title',
                      },
                      validation: (rule) => rule.required(),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'brandFilter',
      title: 'Brand Filter',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'filterItem',
          fields: [
            defineField({
              title: 'Title',
              name: 'title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              title: 'Link',
              name: 'link',
              type: 'slug',
              options: {
                source: 'title',
              },
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'finishFilter',
      title: 'Finish Filter',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'filterItem',
          fields: [
            defineField({
              title: 'Title',
              name: 'title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              title: 'Link',
              name: 'link',
              type: 'slug',
              options: {
                source: 'title',
              },
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
