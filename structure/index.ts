import {ListItemBuilder, StructureResolver} from 'sanity/structure'
import collections from './collectionStructure'
import home from './homeStructure'
import pages from './pageStructure'
import products from './productStructure'
import settings from './settingStructure'
import shop from './shopStructure'
import cart from './cartStructure'
import {getClient} from '../lib/sanity.client'

/**
 * Structure overrides
 *
 * Sanity Studio automatically lists document types out of the box.
 * With this custom structure we achieve things like showing the `home`
 * and `settings` document types as singletons, and grouping product details
 * and variants for easy editorial access.
 *
 * You can customize this even further as your schema types progress.
 * To learn more about structure builder, visit our docs:
 * https://www.sanity.io/docs/overview-structure-builder
 */

// If you add document types to structure manually, you can add them to this function to prevent duplicates in the root pane
const hiddenDocTypes = (listItem: ListItemBuilder) => {
  const id = listItem.getId()

  if (!id) {
    return false
  }

  return ![
    'collection',
    'colorTheme',
    'home',
    'media.tag',
    'page',
    'product',
    'productVariant',
    'settings',
    'shop',
    'cart',
  ].includes(id)
}

// Fetch theme type from settings to determine which structure to use
const fetchThemeType = async () => {
  const query = `*[_type == "settings"][0]{
    themeType
  }`

  const client = getClient()
  const settings = await client.fetch(query)
  return settings.themeType
}

export const structure: StructureResolver = async (S, context) => {
  const themeType = await fetchThemeType()

  return S.list()
    .title('Content')
    .items([
      home(S, context),
      pages(S, context),
      ...(themeType === 'shopify' ? [shop(S, context), cart(S, context)] : []),
      S.divider(),
      collections(S, context),
      ...(themeType === 'shopify' ? [products(S, context)] : []),
      S.divider(),
      settings(S, context),
      S.divider(),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
}
