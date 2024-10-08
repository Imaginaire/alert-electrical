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
  maxVariantPrice?: {amount?: number}
  minVariantPrice?: {amount?: number}
}

export interface Variant {
  quantity?: number
  _weak?: boolean
  _ref?: string
  _type?: string
  _key?: string
  _id?: string
  previewImageUrl?: string
  title?: string
  store?: {
    [key: string]: string | number | string[] | {} | undefined
    _type?: string
    option1?: string
    option2?: string
    option3?: string
    price?: number
    id?: number
    sku?: string
    title?: string
    weight?: number
    inventory?: {isAvailable?: boolean}
  }
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

export interface ShopPageProduct {
  title?: string
  featuredImage?: {
    url?: string
  }
  brand?: {value?: string}
  id?: string
  priceRange?: PriceRange
  compareAtPriceRange?: PriceRange
  slug?: string
}

export interface ProductPageProduct {
  title?: string
  description?: string
  descriptionHtml?: string
  featuredImage?: {
    url?: string
  }
  id?: string
  priceRange?: PriceRange
  compareAtPriceRange?: PriceRange
  brand?: {value?: string}
  range?: {value?: string}
  finish?: {value?: string}
  material?: {value?: string}
  sizeDiameter?: {value?: string}
  cutOutDiameter?: {value?: string}
  height?: {value?: string}
  width?: {value?: string}
  projection?: {value?: string}
  lampSocketType?: {value?: string}
  inputVoltage?: {value?: string}
  electricalClass?: {value?: string}
  numberOfLamps?: {value?: string}
  wattage?: {value?: string}
  maxWattage?: {value?: string}
  lumens?: {value?: string}
  colourTemperature?: {value?: string}
  integratedSwtich?: {value?: string}
  minimumRecessDepth?: {value?: string}
  dimmable?: {value?: string}
  lampsSupplied?: {value?: string}
  ipRating?: {value?: string}
  slug?: {value?: string}
  seo?: {
    title: string
    metaTitle: string
    metaDescription: string
  }
}
