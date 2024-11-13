import {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../utils/defineStructure'
import {CodeBlockIcon} from '@sanity/icons'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Shortcodes')
    .icon(CodeBlockIcon)
    .schemaType('shortcodes')
    .child(S.editor().title('Shortcodes').schemaType('shortcodes').documentId('shortcodes')),
)
