// Utils
import getCanonicalUrl from '@/shared/utils/getCanonicalUrl'
import {GetStaticPaths, GetStaticProps} from 'next'
import {getClient} from '@/lib/sanity.client'
import {readToken} from '@/lib/sanity.api'
import {useLiveQuery} from 'next-sanity/preview'

// Queries
import {settingsQuery, pagesBySlugQuery, homePageTitleQuery, pagePaths} from '@/lib/sanity.queries'

// Types
import {SettingsPayload, PagePayload} from '@/types'
import {PageProps} from '@/components/pages/Page'

// Components
import {Page} from '@/components/pages/Page'

interface Query {
  [key: string]: string
}

export default function PageSlugRoute(props: PageProps) {
  const {homePageTitle, settings, page: initialPage, draftMode, canonicalUrl} = props

  const [page, loading] = useLiveQuery<PagePayload | null>(initialPage, pagesBySlugQuery, {
    slug: initialPage.slug,
  })

  return (
    <Page
      settings={settings}
      page={page}
      homePageTitle={homePageTitle}
      preview={draftMode}
      loading={loading}
      canonicalUrl={canonicalUrl}
    />
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const {draftMode = false, params = {}} = ctx
  const client = getClient(draftMode)

  // console.log(params)

  const joinedSlug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug

  const canonicalUrl = getCanonicalUrl(joinedSlug)

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

  return {
    props: {
      page,
      settings: settings ?? {},
      homePageTitle: homePageTitle ?? undefined,
      draftMode,
      token: draftMode ? readToken : null,
      canonicalUrl,
    },
    revalidate: 10,
  }
}

export const getStaticPaths = async () => {
  const client = getClient()

  const paths = await client.fetch<string[]>(pagePaths)

  const formattedPaths = paths.map((slug) => {
    // Split the slug into segments
    const slugSegments = slug.split('/')

    // Return an object with the joined slug segments as params
    return {params: {slug: slugSegments}}
  })

  // console.log(formattedPaths)

  return {
    paths: formattedPaths || [],
    fallback: 'blocking',
  }
}
