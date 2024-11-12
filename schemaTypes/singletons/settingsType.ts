import {
  CogIcon,
  InfoOutlineIcon,
  ControlsIcon,
  ErrorOutlineIcon,
  MenuIcon,
  SearchIcon,
  HeartIcon,
} from '@sanity/icons'
import {defineType, defineField} from 'sanity'
import columnFields from '../partials/columnFields'
import {customBlock} from '../objects/partials/customBlock'

const TITLE = 'Settings'

export const settingsType = defineType({
  name: 'settings',
  title: TITLE,
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      default: true,
      name: 'navigation',
      title: 'Navigation',
      icon: MenuIcon,
    },
    {
      name: 'companyInfo',
      title: 'Company Info',
      icon: InfoOutlineIcon,
    },
    {
      name: 'productOptions',
      title: 'Product options',
      icon: ControlsIcon,
    },
    {
      name: 'notFoundPage',
      title: '404 page',
      icon: ErrorOutlineIcon,
    },
    {
      name: 'seo',
      title: 'SEO',
      icon: SearchIcon,
    },
    {
      name: 'themeSettings',
      title: 'Theme Settings',
      icon: CogIcon,
    },
    {
      name: 'socialMedia',
      title: 'Social Media',
      icon: HeartIcon,
    },
  ],
  fields: [
    defineField({
      name: 'upperMenuItems',
      title: 'Upper Menu Items',
      type: 'array',
      group: 'navigation',
      description: 'Menu Items displayed above the main menu on the left',
      of: [
        {
          type: 'object',
          name: 'upperMenuItem',
          title: 'Upper Menu Item',
          fields: [
            defineField({
              title: 'Title',
              name: 'title',
              type: 'string',
            }),

            defineField({
              title: 'Sanity Link',
              name: 'sanityLink',
              type: 'reference',
              description:
                'Link to a page. Use this if you are linking to a page hosted on Sanity.',
              to: [
                {
                  type: 'page',
                },
                {
                  type: 'latestNews',
                },
                {
                  type: 'home',
                },
                {
                  type: 'buyersGuide',
                },
              ],
            }),

            defineField({
              title: 'Shopify Link',
              name: 'shopifyLink',
              type: 'string',
              description:
                'Link to a page. Use this if you are linking to a page created on Shopify. Examples include collections and individual products',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'upperMenuCtaText',
      title: 'Upper Menu CTA Text',
      type: 'string',
      group: 'navigation',
      description: 'CTA text on the centre of the upper menu',
    }),
    defineField({
      name: 'menuItems',
      title: 'Menu Item list',
      description: 'Main Menu Items and Mega Menu Items',
      type: 'array',
      group: 'navigation',
      of: [
        {
          type: 'object',
          name: 'menuItem',
          title: 'Menu Item',
          fields: [
            defineField({
              title: 'Title',
              name: 'title',
              type: 'string',
            }),

            defineField({
              title: 'Sanity Link',
              name: 'sanityLink',
              type: 'reference',
              description:
                'Link to a page. Use this if you are linking to a page hosted on Sanity.',
              to: [
                {
                  type: 'page',
                },
                {
                  type: 'latestNews',
                },

                {
                  type: 'home',
                },
              ],
            }),

            defineField({
              title: 'Shopify Link',
              name: 'shopifyLink',
              type: 'string',
              description:
                'Link to a page. Use this if you are linking to a page created on Shopify. Examples include collections and individual products',
            }),

            defineField({
              title: 'use Mega Menu',
              name: 'useMegaMenu',
              type: 'boolean',
              description: 'Enable Mega Menu for this item',
            }),

            // Column 1
            defineField({
              title: 'Mega Menu Items Column 1 Title',
              name: 'megaMenuItemsColumn1Title',
              type: 'string',
            }),
            defineField({
              title: 'Mega Menu Items Column 1',
              name: 'megaMenuItemsColumn1',
              type: 'array',
              of: [
                // Define the structure of megamenu items
                {
                  type: 'object',
                  name: 'megaMenuItem',
                  title: 'MegaMenu Item',
                  fields: [
                    defineField({
                      title: 'Title',
                      name: 'title',
                      type: 'string',
                    }),
                    defineField({
                      title: 'Link',
                      name: 'link',
                      type: 'slug',
                    }),
                  ],
                },
              ],
            }),

            // Column 2
            defineField({
              title: 'Mega Menu Items Column 2 Title',
              name: 'megaMenuItemsColumn2Title',
              type: 'string',
            }),
            defineField({
              title: 'Mega Menu Items Column 2',
              name: 'megaMenuItemsColumn2',
              type: 'array',
              of: [
                // Define the structure of megamenu items
                {
                  type: 'object',
                  name: 'megaMenuItem',
                  title: 'MegaMenu Item',
                  fields: [
                    defineField({
                      title: 'Title',
                      name: 'title',
                      type: 'string',
                    }),
                    defineField({
                      title: 'Link',
                      name: 'link',
                      type: 'slug',
                    }),
                  ],
                },
              ],
            }),

            // Column 3
            defineField({
              title: 'Mega Menu Items Column 3 Title',
              name: 'megaMenuItemsColumn3Title',
              type: 'string',
            }),
            defineField({
              title: 'Mega Menu Items Column 3',
              name: 'megaMenuItemsColumn3',
              type: 'array',
              of: [
                // Define the structure of megamenu items
                {
                  type: 'object',
                  name: 'megaMenuItem',
                  title: 'MegaMenu Item',
                  fields: [
                    defineField({
                      title: 'Title',
                      name: 'title',
                      type: 'string',
                    }),
                    defineField({
                      title: 'Link',
                      name: 'link',
                      type: 'slug',
                    }),
                  ],
                },
              ],
            }),

            // Column 4
            defineField({
              title: 'Mega Menu Items Column 4 Title',
              name: 'megaMenuItemsColumn4Title',
              type: 'string',
            }),
            defineField({
              title: 'Mega Menu Items Column 4',
              name: 'megaMenuItemsColumn4',
              type: 'array',
              of: [
                // Define the structure of megamenu items
                {
                  type: 'object',
                  name: 'megaMenuItem',
                  title: 'MegaMenu Item',
                  fields: [
                    defineField({
                      title: 'Title',
                      name: 'title',
                      type: 'string',
                    }),
                    defineField({
                      title: 'Link',
                      name: 'link',
                      type: 'slug',
                    }),
                  ],
                },
              ],
            }),

            // Mega Menu Image
            defineField({
              title: 'Mega Menu Image',
              name: 'megaMenuImage',
              type: 'image',
            }),
            // Mega menu Image link
            defineField({
              title: 'Mega Menu Image Link',
              name: 'megaMenuImageLink',
              type: 'url',
            }),
          ],
        },
      ],
    }),

    defineField({
      type: 'object',
      name: 'companyInfo',
      title: 'Company Info',
      description: 'Company information displayed across the site',
      group: 'companyInfo',
      options: {
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'name',
          title: 'Company Name',
          type: 'string',
        }),
        defineField({
          name: 'address',
          title: 'Company Address',
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              title: 'Building Name or Number',
              type: 'string',
            }),
            defineField({
              name: 'street',
              title: 'Street',
              type: 'string',
            }),
            defineField({
              name: 'town',
              title: 'Town',
              type: 'string',
            }),
            defineField({
              name: 'city',
              title: 'City',
              type: 'string',
            }),
            defineField({
              name: 'postCode',
              title: 'Post Code',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'phone',
          title: 'Company Phone',
          type: 'string',
        }),
        defineField({
          name: 'email',
          title: 'Company Email',
          type: 'string',
        }),
        defineField({
          name: 'logo',
          title: 'Company Logo',
          type: 'image',
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'availability',
          type: 'availability',
        }),
      ],
    }),

    defineField({
      name: 'newsletter',
      title: 'Newsletter',
      type: 'object',
      description: 'Newsletter section displayed in the footer.',
      group: 'navigation',
      options: {
        collapsible: true,
      },
      fields: [
        defineField({

          name: 'info',
          title: 'Information',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  type: 'string',
                  name: 'text',
                  title: 'CTA Text',
                  validation: (Rule) => Rule.required(),
                },
                {type: 'reference', name: 'link', title: 'CTA Link', to: [{type: 'page'}]},
              ],
            },
          ],
          validation: (Rule) => Rule.max(3).error('You can only add up to 3 info.'),
        }),
      ],
    }),

    defineField({
      name: 'footerCta',
      title: 'Footer CTA',
      type: 'object',
      description: 'Call to action displayed in the footer.',
      group: 'navigation',
      options: {
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'text',
          title: 'CTA Text',
          name: 'heading',
          title: 'Newsletter Heading',
          type: 'string',
        }),
        defineField({
          name: 'subHeading',
          title: 'Newsletter Subheading',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'footer',
      type: 'object',
      title: 'Footer',
      description: 'Footer columns',
      group: 'navigation',
      options: {
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'columns',
          title: 'Columns',
          type: 'array',
          of: [
            defineField({
              name: 'column',
              title: 'Column',
              type: 'object',
              fields: columnFields,
            }),
          ],
        }),
        defineField({
          name: 'payment',
          title: 'Payment',
          type: 'object',
          fields: [
            defineField({
              name: 'paymentText',
              title: 'Text',
              type: 'string',
              description: 'Text displayed next to payment icons.',
            }),
            defineField({
              name: 'paymentIcons',
              title: 'Icons',
              type: 'array',
              of: [
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'image',
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: 'copyright',
          title: 'Copyright',
          type: 'array',
          of: [customBlock],
        }),
        defineField({
          name: 'accreditation',
          title: 'Accreditation',
          type: 'object',
          description: 'Site cccreditation section used in footer.',
          fields: [
            defineField({
              name: 'tagline',
              title: 'Accreditation Tagline',
              description: 'Tagline for accreditation section in footer.',
              type: 'string',
            }),
            defineField({
              name: 'link',
              title: 'Accreditation Link',
              description: 'Link to accredited page.',
              type: 'url',
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'googleTagManager',
      title: 'Google Tag Manager',
      type: 'string',
      group: 'seo',
      description: 'Add Google Tag Manager ID here. This will be added to the head of the site.',
    }),
    defineField({
      name: 'robotsTxt',
      title: 'Robots.txt',
      type: 'object',
      group: 'seo',
      description: 'Add custom rules to your robots.txt file. Make sure the formatting is correct.',
      options: {
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'content',
          title: 'Content',
          type: 'text',
          description:
            'Add custom rules to your robots.txt file. Sitemap will be added automatically, so no need to add it here.',
        }),
      ],
    }),

    defineField({
      name: 'siteNoIndex',
      title: 'Site noindex',
      type: 'boolean',
      group: 'seo',
      description:
        'Discourage search engines from indexing this site. Setting this to true will index the entire site. To noindex individual pages, go to the page and set the noindex field to true.',
    }),

    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      group: 'seo',
      description: 'Displayed on social cards and search engine results.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'themeType',
      title: 'Theme Type',
      type: 'string',
      group: 'themeSettings',
      description:
        'Choose the type of theme you want to use. This will determine the studio structure. Please refresh the studio after publishing this setting.',
      options: {
        list: [
          {title: 'Brochure Site', value: 'brochure'},
          {title: 'Shopify Site', value: 'shopify'},
        ],
      },
    }),

    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      group: 'socialMedia',

      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'object',
          fields: [
            defineField({
              name: 'url',
              title: 'Facebook URL',
              type: 'url',
            }),
            defineField({
              name: 'image',
              title: 'Facebook Image',
              type: 'image',
            }),
          ],
        }),

        defineField({
          name: 'twitter',
          title: 'Twitter',
          type: 'object',
          fields: [
            defineField({
              name: 'url',
              title: 'Twitter URL',
              type: 'url',
            }),
            defineField({
              name: 'image',
              title: 'Twitter Image',
              type: 'image',
            }),
          ],
        }),

        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'object',
          fields: [
            defineField({
              name: 'url',
              title: 'Instagram URL',
              type: 'url',
            }),
            defineField({
              name: 'image',
              title: 'Instagram Image',
              type: 'image',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: TITLE,
      }
    },
  },
})
