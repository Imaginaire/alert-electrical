/**
 * This file contains the static props function that is used to fetch the data for the dynamic slug pages.
 */

// Utils
import {GetStaticProps} from 'next'
import {getClient} from '@/lib/sanity.client'
import getCanonicalUrl from '../getCanonicalUrl'
import {readToken} from '@/lib/sanity.api'

// Types
import {SettingsPayload, PagePayload, PageProps} from '@/types'

// Queries
import {
  settingsQuery,
  pagesBySlugQuery,
  homePageTitleQuery,
  productsQuery,
} from '@/lib/sanity.queries'

interface Query {
  [key: string]: string
}

export const fetchStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const {draftMode = false, params = {}} = ctx
  const client = getClient(draftMode)
  let products = null

  // Join the slug segments to form the full slug
  const joinedSlug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug

  const canonicalUrl = getCanonicalUrl(joinedSlug)

  // Fetch the page data
  const [settings, page, homePageTitle] = await Promise.all([
    client.fetch<SettingsPayload | null>(settingsQuery),
    client.fetch<PagePayload | null>(pagesBySlugQuery, {
      slug: joinedSlug, // Join the segments to form the full slug
    }),
    client.fetch<string | null>(homePageTitleQuery),
  ])

  if (!page) {
    return {
      notFound: true,
    }
  }

  // Fetch products if the page is a shop page
  if (page._type === 'shop') {
    products = await client.fetch(productsQuery)
  }

  return {
    props: {
      page,
      settings: settings ?? {},
      homePageTitle: homePageTitle ?? undefined,
      draftMode,
      token: draftMode ? readToken : null,
      canonicalUrl,
      products: products ?? null,
    },
    // Re-generate the page every 10 seconds: see Next.js revalidation docs
    revalidate: 10,
  }
}
