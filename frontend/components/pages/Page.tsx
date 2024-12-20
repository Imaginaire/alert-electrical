import {useRouter} from 'next/router'
import Layout from '@/components/global/Layout'
import ScrollUp from '../../shared/utils/ScrollUp'
import type {PageProps} from '../../types'

import PageHead from './PageHead'

// components
import Sections from '@/components/global/Sections'

export function Page({page, settings, homePageTitle, preview, loading, canonicalUrl}: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const {sections} = page ?? {}
  const router = useRouter()
  const isHomePage = router.pathname === '/'

  return (
    <>
      <PageHead
        page={page}
        settings={settings}
        title={homePageTitle || ''}
        canonicalUrl={canonicalUrl}
      />

      <Layout settings={settings} preview={preview} loading={loading}>
        <div data-content="main">
          {/* Sections */}
          {sections && sections.length > 0 && <Sections sections={sections} settings={settings} />}

          {/* Workaround: scroll to top on route change */}
          <ScrollUp />
        </div>
      </Layout>
    </>
  )
}
