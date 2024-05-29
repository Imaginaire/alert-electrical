interface Slug {
  _type?: string
  current?: string
}

interface Option {
  _key?: string
  values?: string[]
  _type?: string
  name?: string
}

interface PriceRange {
  maxVariantPrice?: number
  minVariantPrice?: number
}

interface Variant {
  _weak?: boolean
  _ref?: string
  _type?: string
  _key?: string
}

export interface Store {
  slug?: Slug
  options?: Option[]
  priceRange?: PriceRange
  descriptionHtml?: string
  createdAt?: string
  title?: string
  isDeleted?: boolean
  status?: string
  gid?: string
  vendor?: string
  previewImageUrl?: string
  id?: number
  variants?: Variant[]
  productType?: string
  tags?: string
}

export interface Product {
  _rev?: string
  _type?: string
  _id?: string
  store?: Store
  _updatedAt?: string
  _createdAt?: string
}
