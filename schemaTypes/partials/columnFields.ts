import {defineField} from 'sanity'
export default [
  defineField({
    name: 'header',
    title: 'Header',
    type: 'string',
  }),

  defineField({
    name: 'columnLinks',
    title: 'Column Links',
    type: 'array',
    of: [
      {
        type: 'reference',
        to: [
          {
            type: 'page',
          },
        ],
      },
    ],
  }),

  defineField({
    name: 'columnCollectionsLinks',
    title: 'Column Collections Links',
    description: 'Links to collections of pages',
    type: 'array',
    of: [
      {
        type: 'object',
        name: 'collectionLink',
        title: 'Collection Link',
        fields: [
          defineField({
            name: 'title',
            title: 'Collection Page Title',
            type: 'string',
          }),
          defineField({
            name: 'link',
            title: 'Collection Page Link',
            type: 'string',
          }),
        ],
      },
    ],
  }),
]
