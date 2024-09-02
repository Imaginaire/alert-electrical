import type {PortableTextBlock} from '@portabletext/types'

import type {Image, Reference, Slug} from 'sanity'
import {Product, Store} from './productType'

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
}

export interface Hero {
  _type: string
  header?: string
  subheader?: string
  backgroundImage?: Image
  linkText?: string
  linkUrl?: string
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
  // doesn't use _type because it gets the type from a reference
  type: string
  slug?: string
  title?: string
  megaMenuItems?: MegaMenuItem[]
  megaMenuImage?: Image
}

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
}

export interface Accreditation {
  tagline?: string
  link?: string
}

export interface NavbarProps {
  menuItems?: MenuItem[]
  companyInfo?: CompanyInformation
  contactPage?: PagePayload
  navCta?: CtaBanner
}

export interface Footer {
  _type: string
  column1?: Column
  column2?: Column
  column3?: Column
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

export interface PageProps {
  page: PagePayload | undefined | null
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  preview?: boolean
  loading?: boolean
  canonicalUrl?: string
  products?: Product[]
  draftMode?: boolean
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
  slug?: string
  addToCartText?: string
  sections?: Sections[]
  store?: Store
  date?: string
  image?: Image
}

export interface SettingsPayload {
  menuItems?: MenuItem[]
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
}

export interface CtaBanner {
  ctas?: {
    text: string
    link?: {
      slug?: string
    }
  }[]
}

export interface LargeCta {
  _type: string
  header?: string
  description?: PortableTextBlock[]
  backgroundImage?: Image
  linkText?: string
  linkUrl?: string
  slug?: {
    current?: string
  }
}

export interface ShortHero {
  header?: string
  description?: PortableTextBlock[]
}

export interface TextImage {
  header?: string
  description?: PortableTextBlock[]
  availability?: {
    availableTimes?: {from?: string; to?: string}[]
    day?: string
  }[]
  images?: Image[]
}
