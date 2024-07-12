/**
 * This function fetches all the static paths for the dynamic pages
 */

import {getClient} from '@/lib/sanity.client'
import {pagePaths, productPagePaths} from '@/lib/sanity.queries'

export const fetchStaticPaths = async () => {
  const client = getClient()

  try {
    const paths = await client.fetch<string[]>(pagePaths)
    const productPaths = await client.fetch<string[]>(productPagePaths)

    let formattedPaths = paths.map((slug) => {
      // Split the slug into segments
      const slugSegments = slug.split('/')

      // Return an object with the joined slug segments as params
      return {params: {slug: slugSegments}}
    })

    // Add product paths
    formattedPaths = formattedPaths.concat(
      productPaths.map((slug) => {
        return {params: {slug: slug.split('/')}}
      }),
    )

    return formattedPaths
  } catch (error) {
    console.error('Error fetching static paths:', error)
    return []
  }
}
