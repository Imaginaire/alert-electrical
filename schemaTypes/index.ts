import {collectionGroupType} from './objects/collection/collectionGroupType'
import {collectionLinksType} from './objects/collection/collectionLinksType'
import {collectionRuleType} from './objects/shopify/collectionRuleType'
import {customProductOptionColorObjectType} from './objects/customProductOption/customProductOptionColorObjectType'
import {customProductOptionColorType} from './objects/customProductOption/customProductOptionColorType'
import {customProductOptionSizeObjectType} from './objects/customProductOption/customProductOptionSizeObjectType'
import {customProductOptionSizeType} from './objects/customProductOption/customProductOptionSizeType'
import {footerType} from './objects/global/footerType'
import {imageWithProductHotspotsType} from './objects/hotspot/imageWithProductHotspotsType'
import {inventoryType} from './objects/shopify/inventoryType'
import {linkEmailType} from './objects/link/linkEmailType'
import {linkExternalType} from './objects/link/linkExternalType'
import {linkInternalType} from './objects/link/linkInternalType'
import {linkProductType} from './objects/link/linkProductType'
import {menuLinksType} from './objects/global/menuLinksType'
import {menuType} from './objects/global/menuType'
import {notFoundPageType} from './objects/global/notFoundPageType'
import {optionType} from './objects/shopify/optionType'
import {placeholderStringType} from './objects/shopify/placeholderStringType'
import {priceRangeType} from './objects/shopify/priceRangeType'
import {productHotspotsType} from './objects/hotspot/productHotspotsType'
import {productWithVariantType} from './objects/shopify/productWithVariantType'
import {proxyStringType} from './objects/shopify/proxyStringType'
import {shopifyCollectionType} from './objects/shopify/shopifyCollectionType'
import {shopifyProductType} from './objects/shopify/shopifyProductType'
import {shopifyProductVariantType} from './objects/shopify/shopifyProductVariantType'
import {spotType} from './objects/hotspot/spotType'

// Objects used as annotations must be imported first
const annotations = [linkEmailType, linkExternalType, linkInternalType, linkProductType]

const objects = [
  collectionGroupType,
  collectionLinksType,
  collectionRuleType,
  customProductOptionColorObjectType,
  customProductOptionColorType,
  customProductOptionSizeObjectType,
  customProductOptionSizeType,
  footerType,
  imageWithProductHotspotsType,
  inventoryType,
  menuLinksType,
  menuType,
  notFoundPageType,
  optionType,
  placeholderStringType,
  priceRangeType,
  productHotspotsType,
  productWithVariantType,
  proxyStringType,
  shopifyCollectionType,
  shopifyProductType,
  shopifyProductVariantType,
  spotType,
]

import {heroType} from './objects/sections/heroType'
import {textLinkType} from './objects/sections/textLinkType'
import {postContentType} from './objects/sections/postContent'
import {imageGalleryType} from './objects/sections/postContent/imageGallery'
import {headerType} from './objects/sections/headerType'
import {embedType} from './objects/sections/embedType'
import {largeCtaType} from './objects/sections/largeCtaType'
import {shortHeroType} from './objects/sections/shortHeroType'
import newsType from './objects/sections/newsType'
import {textImageType} from './objects/sections/textImageType'


const sections = [
  heroType,
  textLinkType,
  postContentType,
  imageGalleryType,
  headerType,
  embedType,
  largeCtaType,
  shortHeroType,
  newsType,
  textImageType,
]

import {portableTextType} from './portableText/portableTextType'
import {portableTextSimpleType} from './portableText/portableTextSimpleType'

const blocks = [portableTextType, portableTextSimpleType]

import {collectionType} from './documents/collection'
import {pageType} from './documents/page'
import {productType} from './documents/product'
import {productVariantType} from './documents/productVariant'
import {latestNewsType} from './documents/latest-news'

const documents = [collectionType, pageType, productType, productVariantType, latestNewsType]

import {homeType} from './singletons/homeType'
import {settingsType} from './singletons/settingsType'
import {shopType} from './singletons/shopType'
import {cartType} from './singletons/cartType'

const singletons = [homeType, settingsType, shopType, cartType]

export const schemaTypes = [
  ...annotations,
  ...objects,
  ...sections,
  ...singletons,
  ...blocks,
  ...documents,
]
