import {HomePagePayload} from '@/types'
import {getClient} from '../lib/sanity.client'
import {homePageQuery} from '@/lib/sanity.queries'
import {GetStaticProps} from 'next'
import {useLiveQuery} from 'next-sanity/preview'
import {useQuery} from '@sanity/react-loader'
import {Page} from '@/components/pages/Page'
import {init} from 'next/dist/compiled/webpack/webpack'

interface PageProps {
  page: HomePagePayload
}

interface Query {
  [key: string]: string
}

export default function IndexPage(props: any) {
  const {page: initialPage} = props
  const [page, loading] = useLiveQuery<HomePagePayload | null>(initialPage, homePageQuery)

  return <Page page={page} />
}

const fallbackPage: HomePagePayload = {
  title: '',
  sections: [],
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const {draftMode = false} = ctx
  const client = getClient()
  const [page] = await Promise.all([client.fetch<HomePagePayload | null>(homePageQuery)])
  return {
    props: {
      page: page || fallbackPage,
    },
  }
}
