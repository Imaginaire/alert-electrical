import {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Shop Page')
    .schemaType('shop')
    .child(S.editor().title('Shop').schemaType('shop').documentId('shop')),
)
