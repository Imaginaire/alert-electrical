import type {PortableTextBlock} from '@portabletext/types'

import type {Image, Reference, Slug} from 'sanity'
import {ProductPageProduct, ShopPageProduct, Store} from './productType'

// Section Types

export interface Sections {
  _type: string
  hero?: Hero
  embed?: Embed
  postContent?: PostContent
  contactHeader?: ContactHeader
  spacer?: Spacer
  columns?: Columns
  formBuilder?: FormBuilder
  trendingCollections?: TrendingCollections
}

export interface Hero {
  _type: string
  header?: string
  subheader?: string
  content: PortableTextBlock[]
  backgroundImage?: Image
  linkText?: string
  linkUrl?: string
  useSwiper?: boolean
  heros?: Hero[]
  slug?: {
    current?: string
  }
}

export interface Embed {
  _type: string
  html?: string
}

export interface ColumnLink {
  _type?: string
  slug?: string
  title?: string
}

export interface Column {
  _type: string
  header?: string
  columnLinks?: ColumnLink[]
  columnCollectionsLinks?: {
    title?: string
    link?: string
  }[]
}

export interface PostContent {
  _type: string
  content?: PortableTextBlock[]
  width?: number
  backgroundColour?: {
    hex?: string
  }
  padding?: number
}

export interface SocialMediaLink {
  item?: string
  link?: string
}

export interface ContactHeader {
  _type: string
  title?: string
  header?: PortableTextBlock[]
  socialMedia?: SocialMediaLink[]
  socialMediaLink?: string
  phone?: string
  email?: string
}

export interface Spacer {
  spacerHeight?: number
}

export interface Columns {
  _type: string
  contentBlock?: PortableTextBlock[]
}

export interface FormBuilder {
  _type: string
  formId?: string
  formName?: string
  formImage?: Image
  formFields?: {
    required?: boolean
    fieldName?: string
    placeholder?: string
    description?: string
    fieldId?: {
      current?: string
      _type?: Slug
    }
    inputType?: string
  }[]
}

export interface MenuItem {
  title: string
  link: Slug
  sanityLink: Reference | null
  shopifyLink?: string
  useMegaMenu: boolean
  megaMenuItemsColumn1Title?: string
  megaMenuItemsColumn1?: {
    title: string
    link: Slug
  }[]
  megaMenuItemsColumn2Title?: string
  megaMenuItemsColumn2?: {
    title: string
    link: Slug
  }[]
  megaMenuItemsColumn3Title?: string
  megaMenuItemsColumn3?: {
    title: string
    link: Slug
  }[]
  megaMenuItemsColumn4Title?: string
  megaMenuItemsColumn4?: {
    title: string
    link: Slug
  }[]
  megaMenuImage?: Image
  megaMenuImageLink?: string
}

export type MenuItems = MenuItem[]

export interface MenuItemRight {
  title: string
  link?: Slug
  externalLink?: string
  icon: Image
}

export type MenuItemsRight = MenuItemRight[]

export interface MegaMenuItem {
  megaMenuItem: {
    title?: string
    description?: string
    slug?: string
  }
}

export interface LayoutProps {
  children: React.ReactNode
  settings: SettingsPayload | undefined
  preview?: boolean
  loading?: boolean
}

export interface Address {
  _type: string
  number?: string
  street?: string
  town?: string
  city?: string
  postCode?: string
}

export interface CompanyInformation {
  name?: string
  address?: Address
  phone?: string
  email?: string
  logo?: Image
  postCode?: string
  availability?: AvailabilityType
}

export interface Accreditation {
  tagline?: string
  link?: string
}

export interface NavbarProps {
  menuItems?: MenuItems
  menuItemsRight?: MenuItemsRight
  companyInfo?: CompanyInformation
  contactPage?: PagePayload
  navCta?: CtaBanner
  deliveryInfoBar?: DeliveryInfoBar
}

export interface Footer {
  columns?: Column[]
  payment?: {
    paymentText?: string
    paymentIcons?: Image[]
  }
  copyright?: PortableTextBlock[]
  accreditation?: Accreditation
}

export interface GoogleTagManager {
  head?: string
  body?: string
}

export interface RobotsMeta {
  noindex?: boolean
  nofollow?: boolean
  noarchive?: boolean
  noimageindex?: boolean
  nosnippet?: boolean
}

export interface SEO {
  _type: string
  metaTitle?: string
  metaDescription?: string
  robotsMeta?: RobotsMeta
  canonicalUrl?: string
}

export interface FilterItems {
  interiorLightingCategories?: {
    title: string
    link: Slug
    subCategories?: {
      title: string
      link: Slug
    }[]
  }[]
  exteriorLightingCategories?: {
    title: string
    link: Slug
    subCategories?: {
      title: string
      link: Slug
    }[]
  }[]
  brandFilter?: {
    title: string
    link: Slug
  }[]
  finishFilter?: {
    title: string
    link: Slug
  }[]
}

export interface PageProps {
  page: PagePayload | undefined | null
  settings: SettingsPayload | undefined
  homePageTitle: string | null
  preview?: boolean
  loading?: boolean
  canonicalUrl?: string
  products?: ShopPageProduct[]
  draftMode?: boolean
  productSetting?: ProductSettingPayload | null
  product?: ProductPageProduct
  filterItems?: FilterItems | undefined | null
  isNextPage?: boolean
  lastCursor?: string
}

export interface CollectionPageProps {
  page?: {
    title: string
    slug: string
    description: string
  }
  settings?: SettingsPayload | undefined
  homePageTitle?: string | undefined
  canonicalUrl?: string
  products?: ShopPageProduct[]
}

export interface LatestNewsProps {
  page: PagePayload | undefined | null
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  preview?: boolean
  loading?: boolean
  canonicalUrl?: string
  draftMode?: boolean
}

// Page payloads
export interface PagePayload {
  _type?: string
  body?: PortableTextBlock[]
  name?: string
  seo?: SEO
  title?: string
  description?: string
  slug?: string
  addToCartText?: string
  sections?: Sections[]
  store?: Store
  date?: string
  image?: Image
  shortHero?: ShortHero
}

export interface SettingsPayload {
  menuItems?: MenuItem[]
  menuItemsRight?: MenuItemRight[]
  contactPage?: PagePayload
  companyInfo?: CompanyInformation
  googleTagManager?: GoogleTagManager
  accreditation?: Accreditation
  footer?: Footer
  robotsTxt?: {
    content?: string
  }
  siteNoIndex?: boolean
  ogImage?: Image
  navCta?: CtaBanner
  deliveryInfoBar?: DeliveryInfoBar
  socialMedia?: {
    twitter?: SocialMediaLink
    facebook?: SocialMediaLink
    instagram?: SocialMediaLink
  }
}

export interface SocialMediaLink {
  url?: string
  image?: Image
}

export interface Header {
  header: string
  headerTag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  classes?: string
}

export interface BrowseProduct {
  title: string
  product1Title: string
  product2Title: string
  product3Title: string
  product4Title: string
  product5Title: string
  product6Title: string
}

export interface BrowseProducts {
  header: Header
  headerLink: Slug
  headerLinkText: string
  menuItems: BrowseProduct[]
  newInFallback?: boolean
  bestSellersFallback?: boolean
}

export interface CtaBanner {
  ctas?: {
    text: string
    link?: {
      slug?: string
    }
  }[]
}

export interface DeliveryInfoBar {
  info?: {
    text: string
    link?: {
      slug?: string
    }
  }[]
}

export interface Cta {
  _type: string
  content?: PortableTextBlock[]
  linkText?: string
  linkUrl?: string
  slug?: {
    current?: string
  }
}

export interface ShortHero {
  header?: string
  description?: PortableTextBlock[] | string
  shopifyData?: boolean
}

export interface News {
  title?: string
}

export interface TextImage {
  header?: string
  description?: PortableTextBlock[]
  images?: Image[]
  settings?: SettingsPayload | undefined
}

export interface TrendingCollections {
  header?: Header
  link?: Reference
  linkText?: string
  collections?: {
    title?: string
    image?: Image
    linkText?: string
    link?: Reference
  }[]
  slug?: {
    current?: string
  }
}

export interface ProductSettingPayload {
  warranty?: string
  delivery?: PortableTextBlock[]
  cta?: Cta
  masterRobots?: {
    noindex?: boolean
    nofollow?: boolean
    noarchive?: boolean
    noimageindex?: boolean
    nosnippet?: boolean
  }
  productSpecificRobots?: {
    _type: any
    _key: any
    productTitle?: string
    noindex?: boolean
    nofollow?: boolean
    noarchive?: boolean
    noimageindex?: boolean
    nosnippet?: boolean
  }[]
}

export interface FooterProps {
  footer?: Footer
  companyInfo?: CompanyInformation
  socialMedia?: SettingsPayload['socialMedia']
}

export type AvailabilityType =
  | {
      availableTimes?: {from?: string; to?: string}[]
      day?: string
    }[]
  | undefined

export interface TextMapType {
  sectionTitle: string
  description?: PortableTextBlock[]
  showPhoneNumber?: boolean
  phoneNumberCaption?: string
  showEmail?: boolean
  emailCaption?: string
  addressTitle: string
  openingHoursTitle: string
  settings?: SettingsPayload | undefined
}

export interface FormBuilderType {
  _type: string
  formId?: string
  formName?: string
  formImage?: Image
  formFields?: {
    required?: boolean
    fieldName?: string
    placeholder?: string
    description?: string
    fieldId?: {
      current?: string
      _type?: Slug
    }
    inputType?: string
    dropdownOptions?: string[]
  }[]
  useCaptcha?: boolean
  captchaSiteKey?: string
}
