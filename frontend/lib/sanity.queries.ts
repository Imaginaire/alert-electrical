import groq from 'groq'

// custom sections query to get the internal links - will be used across queries so defined here
const sectionsQuery = `
  sections[]{
    ...,
    content[]{
      ...,
      markDefs[]{
        ...,
        _type == "internalLink" => {
          "slug": reference->slug
        }
      }
    },
    contentBlock[]{
      ...,
      content[]{
        ...,
        markDefs[]{
          ...,
          _type == "internalLink" => {
            "slug": reference->slug
          }
        },
      }
    },
    "slug": link->slug,
    heros[]{
      ...,
      "slug": link->slug
    }
  }
`

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    footer,
    seo,
    showcaseProjects[]->{
      _type,
      coverImage,
      overview,
      "slug": slug.current,
      tags,
      title,
    },
    title,
    ${sectionsQuery},
  }
`

export const homePageTitleQuery = groq`
  *[_type == "home"][0].title
`

export const pagesBySlugQuery = groq`
  *[
    ((_type == "page" || _type == "caseStudy" || _type == "latestNews" || _type == "shop" || _type == "cart" || _type == 'brand' || _type == 'finish' ) && slug.current == $slug) || (_type == "product" && store.slug.current == $slug)
  ][0] {
    _id,
    _type,
    body,
    seo,
    title,
    "slug": slug.current,
    coverImage,
    featuredImage,
    shortDescription,
    description,
    image,
    location,
    date,
    tags,
    shortHero,
    ${sectionsQuery},
    "store": {
      ...store,
      "variants": store.variants[]->{
        ...
      }
    }
  }
`

export const productsQuery = groq`
  *[_type == "product"] 
`

export const pageSlug = (ref: string) => groq`
  *[_type == "page" || _type == "blog" && _id == '${ref}'][0]{
    "slug": slug.current,
    "title": title,
  }
`
export const pageTypes = groq`
  *[
    (_type == "page" || _type == "caseStudy") && defined(slug.current)
  ] {
    _id,
    _type,
    slug
  }
`

export const pagePaths = groq`
  *[_type == "page" || _type == "caseStudy" || _type == "latestNews" || _type == "shop" && slug.current != null].slug.current
`

export const productPagePaths = groq`*[_type == "product"].store.slug.current`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    ...,
    footer{
      columns[]{
        header,
        columnCollectionsLinks[],
        columnLinks[]->{
          _type,
          "slug": slug.current,
          title
        }
      },
      payment{
        paymentText,
        paymentIcons[]{
          "icon": asset._ref
        }
      },
      copyright,
      accreditation
    },
    // gets the menu items and the mega menu items
    menuItems[]{
      ...,
        sanityLink->{
          "slug": slug.current
      }
    },
    blogPage->{
      "slug": slug.current,
    },
    contactPage->{
      "slug": slug.current,
    },
    googleTagManager,
    navCta{
      ...,
      ctas[]{
        ...,
        link->{
          "slug": slug.current
        }
      }
    },
    headerStrap,
    siteNoIndex,
    ogImage,
    accreditation,
    socialMedia,
  }
`

export const gtmQuery = groq`
  *[_type == "settings"][0]{
    googleTagManager
  }
`

export const caseStudyQuery = groq`
  *[_type == "caseStudy"] | order(position asc, date desc){
    _id,
    _type,
    "slug": slug.current,
    title,
    date,
    position,
    seo,
    shortDescription,
    featuredImage,
    body,
    tags,
    ${sectionsQuery},
  }
`

export const blogPostQuery = groq`
  *[_type == "blog"] | order(date desc){
    _id,
    _type,
    "slug": slug.current,
    title,
    seo,
    featuredImage,
    date,
    tags,
    ${sectionsQuery},
  }
`

export const newsQuery = groq`
  *[_type == "latestNews"] | order(date desc)[$start...$end]{
    _id,
    _type,
    "slug": slug.current,
    title,
    date,
    seo,
    image,
    body,
    tags,
    ${sectionsQuery},
  }
`

export const productSettingQuery = groq`
  *[_type == "productSetting"][0]{
    ...,
    warranty,
    masterRobots,
    productSpecificRobots,
    delivery[]{
      ...,
      markDefs[]{
          ...,
          _type == "internalLink" => {
            "slug": reference->slug
          }
        },
    },
    cta{
      header,
      description,
      backgroundImage,
      linkText,
    },
   
  }
`
export const filtersQuery = groq`
 *[_type == "filters"][0]{
   finishFilter[],
    brandFilter[],
    interiorLightingCategories[],
    exteriorLightingCategories[]
 }
`
