import {getClient} from '@/lib/sanity.client'
import {newsQuery} from '../../lib/sanity.queries'

export default async function getNewsArticles(start = 0, end = 7) {
  const client = getClient()
  const newsArticles = await client.fetch(newsQuery, {start, end})
  return newsArticles
}
