import type {PortableTextBlock} from '@portabletext/types'

import type {Image, Reference, Slug} from 'sanity'
import {Product, Store} from './productType'

// Section Types

export interface Sections {
  _type: string
  hero?: Hero
  textLink?: TextLink
  embed?: Embed
  gallery?: Gallery
  slider?: Slider
  services?: Services
  cta?: Cta
  sellingPoints?: SellingPoints
  ctaImage?: CtaImage
  ctaStrap?: CtaStrap
  shortHero?: ShortHero
  textImage?: TextImage
  postContent?: PostContent
  testimonial?: Testimonial
  showcaseSlider?: ShowcaseSlider
  heroAlt?: HeroAlt
  featuredCaseStudies?: featuredCaseStudies
  infoStack?: InfoStack
  blogs?: Blogs
  contactHeader?: ContactHeader
  spacer?: Spacer
  columns?: Columns
  caseStudySlider?: CaseStudySlider
  customTable?: CustomTable
  imageGrid?: ImageGrid
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

export interface TextLink {
  _type: string
  header?: string
  content?: PortableTextBlock[]
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

export interface Gallery {
  _type: string
  images?: Image[]
}

export interface Slider {
  _type: string
  images?: Image[]
}

export interface ServiceAreaLink {
  _type: object
  _ref: string
}

export interface ServiceArea {
  header?: string
  subheader?: string
  content?: PortableTextBlock[]
  link?: ServiceAreaLink
  linkText?: object
  slug?: {
    current?: string
  }
}

export interface SellingPoint {
  content?: PortableTextBlock[]
  icon?: Image
}

export interface Services {
  _type: string
  header?: string
  content?: PortableTextBlock[]
  textColour?: string
  serviceAreas?: ServiceArea[]
  link?: string
  linkText?: string
}

export interface Cta {
  _type: string
  content?: PortableTextBlock[]
  backgroundImage?: Image
  link?: string
  linkText?: string
  slug?: {
    current?: string
  }
}

export interface SellingPoints {
  _type: string
  header?: string
  points?: SellingPoint[]
}

export interface CtaImage {
  _type: string
  leftContent?: PortableTextBlock[]
  centreContent?: PortableTextBlock[]
  centreImages?: Image[]
  buttonHeader?: string
  linkText?: string
  link?: string
  externalLink?: string
  mainImage?: Image
  slug?: {
    current?: string
  }
}

export interface CtaStrap {
  _type: string
  imagesLeft?: Image[]
  imagesRight?: Image[]
  content?: PortableTextBlock[]
  linkText?: string
  link?: string
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

export interface ShortHero {
  _type: string
  content?: PortableTextBlock[]
  image?: Image
}

export interface TextImage {
  _type: string
  content?: PortableTextBlock[]
  image?: Image
  imageRight?: boolean
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

export interface Testimonial {
  _type: string
  header?: string
  testimonialContent?: PortableTextBlock[]
  name?: string
  company?: string
}

export interface ShowcaseSlider {
  _type: string
  images?: Image[]
}

export interface HeroAlt {
  _type: string
  title?: string
  content?: PortableTextBlock[]
  image?: Image
}

export interface featuredCaseStudies {
  _type: string
  title?: string
}

export interface InfoStackItem {
  _type: string
  title?: string
  description?: string
}

export interface InfoStack {
  _type: string
  header?: string
  subheader?: string
  content?: InfoStackItem[]
}

export interface Blogs {
  _type: string
  title?: string
  headerContent?: PortableTextBlock[]
  coverPhoto?: Image
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

export interface CaseStudySlider {
  _type: string
  showTags?: boolean
  tags?: Tag[]
}

export interface Rows {
  _type: 'tableRow'
  cells?: string[]
}

export interface CustomTable {
  _type: string
  table?: {
    _type: 'table'
    rows?: Rows[]
  }
}

export interface ImageGrid {
  _type: string
  images?: Image[]
  gridColumns?: number
  width?: string
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

export interface Tag {
  label?: string
  value?: string
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
}

export interface CaseStudyPayload {
  title?: string
  slug?: string
  seo?: SEO
  position?: number
  coverImage?: Image
  featuredImage?: Image
  featuredImageAlt?: string
  shortDescription?: PortableTextBlock[]
  tags?: Tag[]
  location?: string
  date?: string
  sections?: Sections[]
}

export interface BlogPayload {
  title?: string
  slug?: string
  seo?: SEO
  featuredImage?: Image
  date?: string | Date
  tags?: Tag[]
  sections?: Sections[]
}

export interface FooterCta {
  text?: string
  linkText?: string
  link?: {
    slug?: string
  }
}

export interface SettingsPayload {
  menuItems?: MenuItem[]
  contactPage?: PagePayload
  companyInfo?: CompanyInformation
  googleTagManager?: GoogleTagManager
  accreditation?: Accreditation
  footerCta?: FooterCta
  footer?: Footer
  robotsTxt?: {
    content?: string
  }
  siteNoIndex?: boolean
  ogImage?: Image
}
