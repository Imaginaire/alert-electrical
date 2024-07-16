import Head from 'next/head'
import {PagePayload, SettingsPayload} from '@/types'
import prepareMetaRobots from '@/shared/utils/prepareMetaRobots'

export interface PageHeadProps {
  title: string | undefined
  page: PagePayload | undefined | null
  settings: SettingsPayload | undefined
  canonicalUrl?: string
}

export default function PageHead({title, page, settings, canonicalUrl}: PageHeadProps) {
  const {robotsMeta} = page?.seo || {}
  const {siteNoIndex} = settings || {}

  let robotsContent: string = prepareMetaRobots(robotsMeta || {}, siteNoIndex || false)

  return (
    <Head>
      {/* Set canonical, defauls to page url */}
      {page?.seo?.canonicalUrl ? (
        <link rel="canonical" href={page?.seo?.canonicalUrl} />
      ) : (
        <link rel="canonical" href={canonicalUrl} />
      )}

      <title key="title">{page?.seo?.metaTitle}</title>
      <meta key="description" name="description" content={page?.seo?.metaDescription} />
      {robotsContent.length > 0 && <meta name="robots" content={robotsContent} />}

      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
    </Head>
  )
}
