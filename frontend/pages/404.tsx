import Layout from '@/components/global/Layout'
import {getClient} from '@/lib/sanity.client'
import {homePageTitleQuery, settingsQuery} from '@/lib/sanity.queries'
import {PageProps, SettingsPayload} from '@/types'
import {GetStaticProps} from 'next'
import Link from 'next/link'

interface NotFoundProps {
  settings: any
}

export default function NotFound(props: NotFoundProps) {
  const {settings} = props
  return (
    <>
      <Layout settings={settings}>
        <div className="text-center py-20">
          <h1 className="text-2xl">404 - Page Not Found</h1>
          <Link href="/">
            <p className="mt-12 text-primary hover:text-blue-600">
              Click here to return to the shop
            </p>
          </Link>
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const {draftMode = false, params = {}} = ctx

  // get settings, and homepage title
  const client = getClient(draftMode)
  const [settings, homePageTitle] = await Promise.all([
    client.fetch<SettingsPayload | null>(settingsQuery),
    client.fetch<string | null>(homePageTitleQuery),
  ])

  return {
    props: {
      page: null, // Since this is a 404 page, we can set page to null
      settings: settings ?? {},
      homePageTitle: homePageTitle ?? undefined,
      draftMode,
    },
    // Re-generate the page every 10 seconds: see Next.js revalidation docs
    revalidate: 10,
  }
}
