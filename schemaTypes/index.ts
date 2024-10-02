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
import {textMapType} from './objects/sections/textMapType'
import {trendingCollectionsType} from './objects/sections/trendingCollectionsType'

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
  textMapType,
  trendingCollectionsType,
]

import {pageType} from './documents/page'
import {latestNewsType} from './documents/latest-news'
import {productSettingType} from './singletons/product-setting'

const documents = [pageType, latestNewsType, productSettingType]

import {homeType} from './singletons/homeType'
import {settingsType} from './singletons/settingsType'
import {shopType} from './singletons/shopType'
import {cartType} from './singletons/cartType'
import {redirectionsType} from './singletons/redirectionsType'

const singletons = [homeType, settingsType, shopType, cartType, redirectionsType]

export const schemaTypes = [...sections, ...singletons, ...documents]
