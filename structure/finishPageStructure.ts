import {DocumentsIcon} from '@sanity/icons'
import {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Finish Pages')
    .icon(DocumentsIcon)
    .schemaType('finish')
    .child(S.documentTypeList('finish')),
)
