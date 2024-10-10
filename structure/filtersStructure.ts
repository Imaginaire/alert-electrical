import {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../utils/defineStructure'
import {FilterIcon} from '@sanity/icons'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Filters')
    .icon(FilterIcon)
    .schemaType('filters')
    .child(S.editor().title('Filters').schemaType('filters').documentId('filters')),
)
