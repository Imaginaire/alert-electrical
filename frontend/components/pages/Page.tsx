import Layout from '@/shared/Layout'
import ScrollUp from '../../shared/utils/ScrollUp'
import type {HomePagePayload, PagePayload, SettingsPayload} from '../../types'

import PageHead from './PageHead'

// components
// import Sections from 'components/shared/utils/Sections'

export interface PageProps {
  page: PagePayload | HomePagePayload | undefined
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  preview?: boolean
  loading?: boolean
  canonicalUrl?: string
}

export function Page({page, settings, homePageTitle, preview, loading, canonicalUrl}: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const {sections} = page ?? {}

  return (
    <>
      <PageHead page={page} settings={settings} title={homePageTitle} canonicalUrl={canonicalUrl} />

      <Layout settings={settings} preview={preview} loading={loading}>
        <div data-content="main">
          {page?.title && <h1>{page.title}</h1>}

          {/* Sections */}
          {/* {sections && sections.length > 0 && <Sections sections={sections} />} */}

          {/* Workaround: scroll to top on route change */}
          <ScrollUp />
        </div>
      </Layout>
    </>
  )
}
