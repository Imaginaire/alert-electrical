/* 
Returns a field for the sections array that can be used across document schemas 
*/

import {defineArrayMember, defineField} from 'sanity'

export const sections = defineField({
  name: 'sections',
  title: 'Sections',
  description: 'These are the sections that will appear on your landing page.',
  type: 'array',
  group: 'sections',
  of: [
    defineArrayMember({
      type: 'hero',
      name: 'hero',
      title: 'Hero',
    }),
    defineArrayMember({
      type: 'textLink',
      name: 'textLink',
      title: 'Text Link',
    }),
    defineArrayMember({
      type: 'postContent',
      name: 'postContent',
      title: 'Post Content',
    }),
    defineArrayMember({
      type: 'header',
      name: 'header',
      title: 'Header',
    }),
    defineArrayMember({
      type: 'embed',
      name: 'embed',
      title: 'Embed',
    }),
    defineArrayMember({
      type: 'cta',
      name: 'cta',
      title: 'CTA',
    }),
    defineArrayMember({
      type: 'shortHero',
      name: 'shortHero',
      title: 'Short Hero',
    }),
    defineArrayMember({
      type: 'news',
      name: 'news',
      title: 'News',
    }),
    defineArrayMember({
      type: 'textImage',
      name: 'textImage',
      title: 'Text Image',
    }),
    defineArrayMember({
      type: 'textMap',
      name: 'textMap',
      title: 'Text Map',
    }),
    defineArrayMember({
      type: 'trendingCollections',
      name: 'trendingCollections',
      title: 'Trending Collections',
    }),
    defineArrayMember({
      type: 'browseProducts',
      name: 'browseProducts',
      title: 'Browse Products',
    }),
    defineArrayMember({
      type: 'formBuilder',
      name: 'formBuilder',
      title: 'Form Builder',
    }),
    defineArrayMember({
      type: 'serviceAreas',
      name: 'serviceAreas',
      title: 'Service Areas',
    }),
    defineArrayMember({
      type: 'ourTopBrands',
      name: 'ourTopBrands',
      title: 'Our Top Brands',
    }),
    defineArrayMember({
      type: 'accordion',
      name: 'accordion',
      title: 'Accordion',
    }),
    defineArrayMember({
      type: 'headerStrap',
      name: 'headerStrap',
      title: 'Header Strap',
    }),
    defineArrayMember({
      type: 'simpleText',
      name: 'simpleText',
      title: 'Simple Text',
    }),
    defineArrayMember({
      type: 'contactUs',
      name: 'contactUs',
      title: 'Contact Us',
    }),
    defineArrayMember({
      type: 'officeInfo',
      name: 'officeInfo',
      title: 'Office Info',
    }),
  ],
})
