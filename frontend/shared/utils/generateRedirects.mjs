// Generate redirects from Sanity.io, uses new client in this file as cannot use getClient as it is a typescript file and needs to be javascript for next.config.mjs
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'a430q0zj',
  dataset: 'production',
  useCdn: false,
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

  // Filter out invalid redirects (those missing 'source', 'destination', or 'permanent')
  const validRedirects = Array.isArray(redirects)
    ? redirects.filter(
        (redirect) =>
          redirect.source && redirect.destination && typeof redirect.permanent === 'boolean',
      )
    : []

  // Return valid redirects if any, otherwise return an empty array
  if (validRedirects.length > 0) {
    return validRedirects
  }

  return []
}
