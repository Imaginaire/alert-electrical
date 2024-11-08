import {ListItemBuilder, StructureResolver} from 'sanity/structure'
import home from './homeStructure'
import pages from './pageStructure'
import settings from './settingStructure'
import shop from './shopStructure'
import cart from './cartStructure'
import latestNews from './latestNewsStructure'
import productSetting from './productSettingStructure'
import redirections from './redirectionsStructure'
import {getClient} from '../lib/sanity.client'
import filters from './filtersStructure'
import buyersGuide from './buyersGuideStructure'

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
    'home',
    'media.tag',
    'page',
    'latestNews',
    'buyersGuide',
    'settings',
    'shop',
    'cart',
    'productSetting',
    'redirections',
    'filters',
    'brand',
    'finish',
  ].includes(id)
}

// Fetch theme type from settings to determine which structure to use
const fetchThemeType = async () => {
  const query = `*[_type == "settings"][0]{
    themeType
  }`

  const client = getClient()
  const settings = (await client.fetch(query)) || {themeType: 'brochure'}
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
      productSetting(S, context),
      S.divider(),
      latestNews(S, context),
      buyersGuide(S, context),
      S.divider(),
      settings(S, context),
      redirections(S, context),
      S.divider(),
      filters(S, context),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
}
