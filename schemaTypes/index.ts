import {heroType} from './objects/sections/heroType'
import {textLinkType} from './objects/sections/textLinkType'
import {postContentType} from './objects/sections/postContent'
import {imageGalleryType} from './objects/sections/postContent/imageGallery'
import {headerType} from './objects/sections/headerType'
import {embedType} from './objects/sections/embedType'
import {ctaType} from './objects/sections/ctaType'
import {shortHeroType} from './objects/sections/shortHeroType'
import newsType from './objects/sections/newsType'
import {textImageType} from './objects/sections/textImageType'
import {textMapType} from './objects/sections/textMapType'
import {trendingCollectionsType} from './objects/sections/trendingCollectionsType'
import formBuilderType from './objects/sections/formBuilderType/formBuilderType'
import formFields from './objects/sections/formBuilderType/formFields'
import {serviceAreasType} from './objects/sections/serviceAreasType'
import {ourTopBrandsType} from './objects/sections/ourTopBrandsType'
import {accordionType} from './objects/sections/accordionType'
import {customTableType} from './objects/sections/postContent/customTable'
import {headerStrapType} from './objects/sections/headerStrap'
import {simpleTextType} from './objects/sections/simpleText'
import {contactUsType} from './objects/sections/contactUsType'

const sections = [
  heroType,
  textLinkType,
  postContentType,
  imageGalleryType,
  headerType,
  embedType,
  ctaType,
  shortHeroType,
  newsType,
  textImageType,
  textMapType,
  trendingCollectionsType,
  browseProductsType,
  formBuilderType,
  formFields,
  serviceAreasType,
  ourTopBrandsType,
  accordionType,
  customTableType,
  headerStrapType,
  simpleTextType,
  contactUsType,
]

import {pageType} from './documents/page'
import {latestNewsType} from './documents/latest-news'
import {brandType} from './documents/brand'
import {finishType} from './documents/finish'
import {buyersGuideType} from './documents/buyers-guide'

const documents = [pageType, latestNewsType, buyersGuideType, brandType, finishType]

import {homeType} from './singletons/homeType'
import {settingsType} from './singletons/settingsType'
import {shopType} from './singletons/shopType'
import {cartType} from './singletons/cartType'
import {redirectionsType} from './singletons/redirectionsType'
import {browseProductsType} from './objects/sections/browseProductsType'
import {filtersType} from './singletons/filtersType'
import {productSettingType} from './singletons/product-setting'

const singletons = [
  homeType,
  settingsType,
  shopType,
  cartType,
  redirectionsType,
  productSettingType,
  filtersType,
]

export const schemaTypes = [...sections, ...singletons, ...documents]
