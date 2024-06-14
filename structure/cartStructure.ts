import {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Cart')
    .schemaType('cart')
    .child(S.editor().title('Cart').schemaType('cart').documentId('cart')),
)
