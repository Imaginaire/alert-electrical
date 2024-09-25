// Generate redirects from Sanity.io, uses new client in this file as cannot use getClient as it is a typescript file and needs to be javascript for next.config.mjs
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
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
  if (redirects !== null) {
    return redirects
  }

  return []
}
