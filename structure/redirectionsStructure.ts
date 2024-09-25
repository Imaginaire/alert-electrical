import {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Redirections')
    .schemaType('redirections')
    .child(S.editor().title('Redirections').schemaType('redirections').documentId('redirections')),
)
