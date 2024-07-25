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
    // defineArrayMember({
    //   type: 'gallery',
    //   name: 'gallery',
    //   title: 'Gallery',
    // }),
    // defineArrayMember({
    //   type: 'slider',
    //   name: 'slider',
    //   title: 'Slider',
    // }),
    // defineArrayMember({
    //   type: 'services',
    //   name: 'services',
    //   title: 'Services',
    // }),
    // defineArrayMember({
    //   type: 'cta',
    //   name: 'cta',
    //   title: 'Call to Action',
    // }),
    // defineArrayMember({
    //   type: 'sellingPoints',
    //   name: 'sellingPoints',
    //   title: 'Selling Points',
    // }),
    // defineArrayMember({
    //   type: 'ctaImage',
    //   name: 'ctaImage',
    //   title: 'Call to Action Image',
    // }),
    // defineArrayMember({
    //   type: 'ctaStrap',
    //   name: 'ctaStrap',
    //   title: 'Call to Action Strap',
    // }),
    // defineArrayMember({
    //   type: 'shortHero',
    //   name: 'shortHero',
    //   title: 'Short Hero',
    // }),
    // defineArrayMember({
    //   type: 'textImage',
    //   name: 'textImage',
    //   title: 'Text Image',
    // }),
    // defineArrayMember({
    //   type: 'postContent',
    //   name: 'postContent',
    //   title: 'Post Content',
    // }),
    // defineArrayMember({
    //   type: 'testimonial',
    //   name: 'testimonial',
    //   title: 'Testimonial',
    // }),
    // defineArrayMember({
    //   type: 'showcaseSlider',
    //   name: 'showcaseSlider',
    //   title: 'Showcase Slider',
    // }),
    // defineArrayMember({
    //   type: 'caseStudies',
    //   name: 'caseStudies',
    //   title: 'Case Studies',
    // }),
    // defineArrayMember({
    //   type: 'heroAlt',
    //   name: 'heroAlt',
    //   title: 'Hero Alt',
    // }),
    // defineArrayMember({
    //   type: 'featuredCaseStudies',
    //   name: 'featuredCaseStudies',
    //   title: 'Featured Case Studies',
    // }),
    // defineArrayMember({
    //   type: 'infoStack',
    //   name: 'infoStack',
    //   title: 'Info Stack',
    // }),
    // defineArrayMember({
    //   type: 'blogs',
    //   name: 'blogs',
    //   title: 'Blogs',
    // }),
    // defineArrayMember({
    //   type: 'contactHeader',
    //   name: 'contactHeader',
    //   title: 'Contact Header',
    // }),
    // defineArrayMember({
    //   type: 'spacer',
    //   name: 'spacer',
    //   title: 'Spacer',
    // }),
    // defineArrayMember({
    //   type: 'columns',
    //   name: 'columns',
    //   title: 'Columns',
    // }),
    // defineArrayMember({
    //   type: 'caseStudySlider',
    //   name: 'caseStudySlider',
    //   title: 'Case Study Slider',
    // }),
    // defineArrayMember({
    //   type: 'customTable',
    //   name: 'customTable',
    //   title: 'Custom Table',
    // }),
    // defineArrayMember({
    //   type: 'imageGrid',
    //   name: 'imageGrid',
    //   title: 'Image Grid',
    // }),
    // defineArrayMember({
    //   type: 'formBuilder',
    //   name: 'formBuilder',
    //   title: 'Form Builder',
    // }),
  ],
})
