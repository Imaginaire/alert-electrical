/* 
Exports custom block for use in schemas, here you can add additional classnames and styles. 

Remember to update the CustomPortableText component to reflect any changes.
*/
import {defineField} from 'sanity'

// link icons
import InternalLink from '../../../svgs/InternalLink'
import ExternalLink from '../../../svgs/ExternalLink'
import {LeftAlignIcon} from '../../../svgs/LeftAlignIcon'
import {CenterAlignIcon} from '../../../svgs/CenterAlignIcon'
import {RightAlignIcon} from '../../../svgs/RightAlignIcon'

export const customBlock = {
  type: 'block',
  name: 'customBlock',
  styles: [
    {title: 'Normal', value: 'normal'},
    {title: 'H1', value: 'h1'},
    {title: 'H2', value: 'h2'},
    {title: 'H3', value: 'h3'},
    {title: 'H4', value: 'h4'},
    {title: 'Quote', value: 'blockquote'},
    {title: 'Normal Alt', value: 'normalAlt'},
    {title: 'bullet', value: 'bullet'},
  ],
  lists: [
    {title: 'Numbered', value: 'number'}, // Add ordered list
    {title: 'Bullet', value: 'bullet'}, // Add bullet list
  ],
  marks: {
    decorators: [
      {title: 'Strong', value: 'strong'},
      {title: 'Emphasis', value: 'em'},
      {title: 'Code', value: 'code'},
      {title: 'Underline', value: 'underline'},
      {title: 'Strike', value: 'strike-through'},
      {title: 'Left', value: 'left', icon: LeftAlignIcon},
      {title: 'Center', value: 'center', icon: CenterAlignIcon},
      {title: 'Right', value: 'right', icon: RightAlignIcon},
    ],
    annotations: [
      {
        name: 'internalLink',
        type: 'object',
        title: 'Internal link',
        icon: InternalLink,
        fields: [
          defineField({
            name: 'reference',
            type: 'reference',
            title: 'Reference',
            to: [{type: 'page'}],
          }),
          defineField({
            name: 'useButton',
            type: 'boolean',
            title: 'Use Button',
            description: 'Use a button instead of a link',
          }),
          defineField({
            name: 'buttonPosition',
            type: 'string',
            title: 'Button Position',
            options: {
              list: [
                {title: 'Left', value: 'start'},
                {title: 'Center', value: 'center'},
                {title: 'Right', value: 'end'},
              ],
            },
          }),
        ],
      },
      {
        name: 'link',
        type: 'object',
        title: 'External link',
        icon: ExternalLink,
        fields: [
          defineField({
            name: 'href',
            type: 'url',
            title: 'URL',
            validation: (Rule) =>
              Rule.uri({
                scheme: ['http', 'https', 'mailto'],
              }),
          }),
          defineField({
            name: 'blank',
            type: 'boolean',
            title: 'Open in new tab',
            description: 'Read https://css-tricks.com/use-target_blank/',
          }),
          defineField({
            name: 'useButton',
            type: 'boolean',
            title: 'Use Button',
            description: 'Use a button instead of a link',
          }),
          defineField({
            name: 'buttonPosition',
            type: 'string',
            title: 'Button Position',
            options: {
              list: [
                {title: 'Left', value: 'start'},
                {title: 'Center', value: 'center'},
                {title: 'Right', value: 'end'},
              ],
            },
          }),
        ],
      },
      {
        type: 'textColor',
      },
    ],
  },
}
