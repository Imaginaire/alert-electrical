import {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../utils/defineStructure'
import {DocumentSheetIcon} from '@sanity/icons'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Buyers Guide')
    .icon(DocumentSheetIcon)
    .schemaType('buyersGuide')
    .child(S.documentTypeList('buyersGuide')),
)
