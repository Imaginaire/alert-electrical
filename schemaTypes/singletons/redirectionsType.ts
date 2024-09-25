import {defineField, defineType} from 'sanity'
import {TransferIcon, DoubleChevronRightIcon} from '@sanity/icons'

export const redirectionsType = defineType({
  name: 'redirections',
  title: 'Redirections',
  type: 'document',
  icon: TransferIcon,
  fields: [
    defineField({
      name: 'redirects',
      title: 'Redirects',
      type: 'array',
      description:
        'Manage redirects for this site. As the site is client side, this will only work for direct access to links, not links from within the site. Remember to update any links (buttons, navbar, etc.) on the site to reflect the changes here.',
      of: [
        {
          type: 'object',
          name: 'redirect',
          title: 'Redirect',
          icon: DoubleChevronRightIcon,
          fields: [
            defineField({
              name: 'source',
              title: 'Source',
              type: 'string',
              description: 'Remember to include the leading slash.',
              validation: (Rule) => [
                Rule.required(),
                Rule.custom((source) => {
                  if (!source?.startsWith('/')) {
                    return 'Source must start with a slash.'
                  }

                  return true
                }),
              ],
            }),
            defineField({
              name: 'destination',
              title: 'Destination',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'statusCode',
              title: 'Status Code',
              type: 'number',
              options: {
                list: [
                  {title: '301 Permanent Redirect', value: 301},
                  {title: '302 Temporary Redirect', value: 302},
                  {title: '307 Temporary Redirect', value: 307},
                  {title: '308 Permanent Redirect', value: 308},
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              source: 'source',
              destination: 'destination',
              statusCode: 'statusCode',
            },
            prepare({source, destination, statusCode}) {
              return {
                title: `${source} → ${destination}`,
                subtitle: `Status Code: ${statusCode}`,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Redirections',
      }
    },
  },
})
