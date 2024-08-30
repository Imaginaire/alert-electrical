import {getClient} from '@/lib/sanity.client'
import {newsQuery} from '../../lib/sanity.queries'

export default async function getNewsArticles() {
  const client = getClient()
  const newsArticles = await client.fetch(newsQuery)
  return newsArticles
}
