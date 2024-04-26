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
          //   {
          //     type: 'blog',
          //   },
          //   {
          //     type: 'caseStudy',
          //   },
        ],
      },
    ],
  }),
]
