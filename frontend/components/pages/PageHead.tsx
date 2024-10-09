import Head from 'next/head'
import {PagePayload, SettingsPayload} from '@/types'
import prepareMetaRobots from '@/shared/utils/prepareMetaRobots'

export interface PageHeadProps {
  title?: string | undefined
  page?: PagePayload | undefined | null
  // Type for when on a Shopify product page
  productSeo?: {
    title: string
    description: string
  }
  settings?: SettingsPayload | undefined
  canonicalUrl?: string
  fallbackRobots?: {
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

export default function PageHead({
  page,
  productSeo,
  fallbackRobots,
  productSpecificRobots,
  settings,
  canonicalUrl,
  title,
}: PageHeadProps) {
  let robotsMeta = {}

  if (page) {
    robotsMeta = page?.seo?.robotsMeta || {}
  } else {
    // check if we have product specific robots
    if (productSpecificRobots && productSpecificRobots.length > 0) {
      let productSpecificRobotsMatch = productSpecificRobots.find(
        (item) => item.productTitle === title,
      )
      robotsMeta = {
        noarchive: productSpecificRobotsMatch?.noarchive || false,
        nofollow: productSpecificRobotsMatch?.nofollow || false,
        noindex: productSpecificRobotsMatch?.noindex || false,
        nosnippet: productSpecificRobotsMatch?.nosnippet || false,
        noimageindex: productSpecificRobotsMatch?.noimageindex || false,
      }
    } else {
      robotsMeta = fallbackRobots || {}
    }
  }

  const {siteNoIndex} = settings || {}

  let robotsContent: string = prepareMetaRobots(robotsMeta || {}, siteNoIndex || false)

  const metaTitle = productSeo?.title || page?.seo?.metaTitle || page?.title
  const metaDescription = productSeo?.description || page?.seo?.metaDescription

  return (
    <Head>
      {/* Set canonical, defauls to page url */}
      {page?.seo?.canonicalUrl ? (
        <link rel="canonical" href={page?.seo?.canonicalUrl} />
      ) : (
        <link rel="canonical" href={canonicalUrl} />
      )}

      <title key="title">{metaTitle || 'Default Site Title'}</title>
      <meta
        key="description"
        name="description"
        content={metaDescription || metaTitle || title || 'Default Site Description'}
      />
      {robotsContent.length > 0 && <meta name="robots" content={robotsContent} />}

      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
    </Head>
  )
}
