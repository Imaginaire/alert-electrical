import {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../utils/defineStructure'
import {defaultDocumentNode} from './defaultDocumentNode'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Home')
    .schemaType('home')
    .child(
      S.editor()
        .title('Home')
        .schemaType('home')
        .documentId('home')
        .views(defaultDocumentNode(S, {schemaType: 'home'})?.getViews() || []),
    ),
)
