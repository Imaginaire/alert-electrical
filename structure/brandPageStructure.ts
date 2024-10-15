import {DocumentsIcon} from '@sanity/icons'
import {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Brand Pages')
    .icon(DocumentsIcon)
    .schemaType('brand')
    .child(S.documentTypeList('brand')),
)
