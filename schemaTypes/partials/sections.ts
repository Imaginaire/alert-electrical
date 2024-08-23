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
      type: 'largeCta',
      name: 'largeCta',
      title: 'Large CTA',
    }),
  ],
})
