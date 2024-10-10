import {getClient} from '../lib/sanity.client'
import {
  buildAllCollectionUrls,
  fetchShopifyCollections,
  fetchUniqueMetafieldSlugs,
  getShopifyProductSlugs,
} from '../lib/shopify.helpers'

export default function SiteMap() {
  return <div>loading sitemap</div>
}

function generateSiteMap(slugs) {
  let baseURL = ''

  if (process.env.NEXT_PUBLIC_ENV === 'production') {
    baseURL = process.env.NEXT_PUBLIC_PRODUCTION_URL
  } else if (process.env.NEXT_PUBLIC_ENV === 'development') {
    baseURL = process.env.NEXT_PUBLIC_DEVELOPMENT_URL
  } else {
    baseURL = 'http://localhost:3000/'
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    
        ${slugs
          .map(({slug, updatedAt}) => {
            if (slug === '/') {
              return `
                <url>
                    <loc>${baseURL}</loc>
                    <lastmod>${updatedAt}</lastmod>
                </url>
                `
            } else {
              return `
              <url>
                <loc>${baseURL}${slug}/</loc>
                <lastmod>${updatedAt}</lastmod>
              </url>
            `
            }
          })
          .join('')}
  
          </urlset>
    `
}

export async function getServerSideProps({res}) {
  const client = getClient()

  const sanitySlugsQuery = `
   *[defined(slug.current) || _type == "home"] {
    "slug": coalesce(slug.current, "/"),
    "updatedAt": _updatedAt
  }
`

  // get sanity slugs
  const sanitySlugs = await client.fetch(sanitySlugsQuery)

  //   // get product page slugs
  const shopifyProductSlugs = await getShopifyProductSlugs()

  //   // get collection slugs
  const shopifyCollectionSlugs = await buildAllCollectionUrls(await fetchShopifyCollections())

  // get brand/metafield slugs
  const pagesByMetaField = ['brand', 'finish', 'range']

  // get all metafields
  const metafieldSlugsArray = await Promise.all(
    pagesByMetaField.map((metaField) => fetchUniqueMetafieldSlugs(metaField)),
  )

  // Flatten metafield slugs into a single array
  const metafieldSlugs = metafieldSlugsArray.flat()

  const siteMap = generateSiteMap([
    ...sanitySlugs,
    ...shopifyProductSlugs,
    ...shopifyCollectionSlugs,
    ...metafieldSlugs,
  ])

  res.setHeader('Content-Type', 'text/xml')
  res.write(siteMap)
  res.end()

  return {
    props: {},
  }
}
