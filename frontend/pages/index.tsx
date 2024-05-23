/**
 * This is the main page of the site. It fetches the home page data from Sanity and passes it to the Page component.
 */

import {getClient} from '../lib/sanity.client'
import {homePageQuery, settingsQuery} from '@/lib/sanity.queries'
import {GetStaticProps} from 'next'
import {useLiveQuery} from 'next-sanity/preview'
import {readToken} from '@/lib/sanity.api'

// components
import {Page} from '@/components/pages/Page'

// types
import {PagePayload, SettingsPayload} from '@/types'

interface PageProps {
  page: PagePayload
  settings: SettingsPayload
  draftMode: boolean
  token: string | null
}

interface Query {
  [key: string]: string
}

export default function IndexPage(props: PageProps) {
  const {page: initialPage, settings, draftMode} = props
  // Fetch the home page data
  const [page, loading] = useLiveQuery<PagePayload | null>(initialPage, homePageQuery)

  return <Page settings={settings} page={page} />
}

const fallbackPage: PagePayload = {
  title: '',
  sections: [],
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const {draftMode = false} = ctx
  const client = getClient()
  const [page, settings] = await Promise.all([
    client.fetch<PagePayload | null>(homePageQuery),
    client.fetch<SettingsPayload | null>(settingsQuery),
  ])
  return {
    props: {
      page: page || fallbackPage,
      settings: settings || {},
      draftMode,
      token: draftMode ? readToken : null,
    },
  }
}
