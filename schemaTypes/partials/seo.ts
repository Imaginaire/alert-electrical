/* Fields for SEO section on pages */

import {getClient} from '../../frontend/lib/sanity.client'
import {defineField} from 'sanity'
import groq from 'groq'

export const seo = defineField({
  name: 'seo',
  title: 'SEO',
  description: 'SEO settings for this page.',
  group: 'seo',
  type: 'object',
  //   initialValue: async () => {
  //     const client = getClient()
  //     const query = groq`
  //         *[_type == "home"][0]{
  //         title
  //       }`
  //     let res = await client.fetch(query)
  //     return {
  //       metaTitle: ` ${res.title} |  `,
  //     }
  //   },
  options: {
    collapsible: true,
  },

  fields: [
    defineField({
      name: 'metaTitle',
      description: 'Used for the <meta> title tag for SEO. (Max 60 characters)',
      title: 'Meta Title',
      type: 'string',
      validation: (rule) => rule.max(60).warning('Meta Title should be less than 60 characters.'),
    }),
    defineField({
      name: 'metaDescription',
      description: 'Used for the <meta> description tag for SEO. (Max 155 characters)',
      title: 'Meta Description',
      type: 'text',
      validation: (rule) =>
        rule.max(155).warning('Meta Description should be less than 155 characters.'),
    }),
    defineField({
      name: 'robotsMeta',
      description: 'Used for the <meta> robots tag for SEO.',
      title: 'Robots Meta',
      type: 'object',
      options: {
        columns: 2,
      },
      fields: [
        defineField({
          name: 'noindex',
          title: 'No Index',
          type: 'boolean',
          description: 'Discourages search engines from indexing page.',
          initialValue: false,
        }),
        defineField({
          name: 'nofollow',
          title: 'No Follow',
          type: 'boolean',
          description: 'Discourages search engines from following links.',
          initialValue: false,
        }),
        defineField({
          name: 'noarchive',
          title: 'No Archive',
          type: 'boolean',
          description: 'Prevents search engines from showing a cached links for pages.',
          initialValue: false,
        }),
        defineField({
          name: 'noimageindex',
          title: 'No Image Index',
          type: 'boolean',
          description: 'Prevents search engines from indexing images.',
          initialValue: false,
        }),
        defineField({
          name: 'nosnippet',
          title: 'No Snippet',
          type: 'boolean',
          description: 'Prevents search engines from showing a snippet.',
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: 'canonicalUrl',
      description:
        'Used for the <link rel="canonical"> tag for SEO. Defaults to the current page if not set. (Remember to include http:// or https://)',
      title: 'Canonical URL',
      type: 'url',
    }),
  ],
})
