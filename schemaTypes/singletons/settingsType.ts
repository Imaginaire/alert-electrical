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

const TITLE = 'Settings'
interface ProductOptions {
  title: string
}

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
      name: 'menuItems',
      title: 'Menu Item list',
      description: 'Links displayed on the header of your site.',
      type: 'array',
      group: 'navigation',
      of: [
        {
          type: 'object',
          name: 'menuItem',
          title: 'Menu Item',
          fields: [
            defineField({
              title: 'Reference',
              name: 'reference',
              type: 'reference',
              to: [
                {
                  type: 'home',
                },
                {
                  type: 'page',
                },
                {
                  type: 'shop',
                },
                {
                  type: 'latestNews',
                },
                // {
                //   type: 'caseStudy',
                // },
              ],
            }),
            defineField({
              title: 'Mega Menu Items',
              name: 'megaMenuItems',
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
                      title: 'Description',
                      name: 'description',
                      type: 'text',
                    }),
                    defineField({
                      title: 'Link',
                      name: 'link',
                      type: 'reference',
                      to: [
                        {
                          type: 'page',
                        },
                        {
                          type: 'latestNews',
                        },
                        // {
                        //   type: 'caseStudy',
                        // },
                      ],
                    }),
                  ],
                },
              ],
            }),
            defineField({
              title: 'Mega Menu Image',
              name: 'megaMenuImage',
              type: 'image',
            }),
          ],
          preview: {
            select: {
              title: 'reference.title',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'contactPage',
      title: 'Contact Page',
      type: 'reference',
      to: [
        {
          type: 'page',
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
      ],
    }),

    defineField({
      name: 'navCta',
      title: 'Navbar CTAs',
      type: 'object',
      description: 'Call to action items displayed above the navbar.',
      group: 'navigation',
      options: {
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'ctas',
          title: 'CTAs',
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
          validation: (Rule) => Rule.max(3).error('You can only add up to 3 CTAs.'),
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
          type: 'string',
        }),
        defineField({
          name: 'linkText',
          title: 'CTA Link Text',
          type: 'string',
        }),
        defineField({
          name: 'link',
          title: 'CTA Link',
          type: 'reference',
          to: [
            {
              type: 'page',
            },
            {
              type: 'latestNews',
            },
            // {
            //   type: 'caseStudy',
            // },
          ],
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
          name: 'column1',
          title: 'Column 1',
          type: 'object',
          fields: columnFields,
        }),
        defineField({
          name: 'column2',
          title: 'Column 2',
          type: 'object',
          fields: columnFields,
        }),
        defineField({
          name: 'column3',
          title: 'Column 3',
          type: 'object',
          fields: columnFields,
        }),
        defineField({
          name: 'column4',
          title: 'Column 4',
          type: 'object',
          fields: columnFields,
        }),
        defineField({
          name: 'column5',
          title: 'Column 5',
          type: 'object',
          fields: columnFields,
        }),
        defineField({
          name: 'column6',
          title: 'Column 6',
          type: 'object',
          fields: [
            defineField({
              name: 'header',
              title: 'Header',
              type: 'string',
              description: 'Header for Get in Touch column.',
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'accreditation',
      title: 'Accreditation',
      type: 'object',
      description: 'Site cccreditation section used in footer.',
      options: {
        collapsible: true,
        collapsed: true,
      },
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
