import {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../utils/defineStructure'
import {DocumentSheetIcon} from '@sanity/icons'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Latest News')
    .icon(DocumentSheetIcon)
    .schemaType('latestNews')
    .child(S.documentTypeList('latestNews')),
)
