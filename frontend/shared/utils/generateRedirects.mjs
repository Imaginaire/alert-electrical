// Generate redirects from Sanity.io, uses new client in this file as cannot use getClient as it is a typescript file and needs to be javascript for next.config.mjs
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'a430q0zj',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2022-03-07',
})

const query = `
  *[_type == "redirections"].redirects[]{
      source,
      destination,
      statusCode
  }
`

export default async function generateRedirects() {
  const redirects = await client.fetch(query)

  // Filter out invalid redirects
  const validRedirects = redirects.filter(
    (redirect) =>
      redirect.source &&
      typeof redirect.source === 'string' &&
      redirect.destination &&
      typeof redirect.destination === 'string' &&
      redirect.statusCode &&
      typeof redirect.statusCode === 'number',
  )

  // Return valid redirects if any, otherwise return an empty array
  if (validRedirects.length > 0) {
    console.log(`Generated ${validRedirects.length} redirects`)
    return validRedirects
  }

  console.log('Generated 0 redirects')
  return []
}
