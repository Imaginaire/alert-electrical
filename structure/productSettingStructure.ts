import {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../utils/defineStructure'
import {ColorWheelIcon} from '@sanity/icons'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Product Page')
    .icon(ColorWheelIcon)
    .schemaType('productSetting')
    .child(
      S.editor().title('Product Setting').schemaType('productSetting').documentId('productSetting'),
    ),
)
