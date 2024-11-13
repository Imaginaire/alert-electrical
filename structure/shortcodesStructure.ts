import {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Shortcodes')
    .schemaType('shortcodes')
    .child(S.editor().title('Shortcodes').schemaType('shortcodes').documentId('shortcodes')),
)
