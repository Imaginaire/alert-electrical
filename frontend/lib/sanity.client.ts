import {apiVersion, dataset, projectId, readToken, useCdn} from './sanity.api'
import {createClient, type SanityClient} from '@sanity/client'

export function getClient(previewDrafts?: boolean): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: !previewDrafts, // Disable CDN when previewing drafts
    // Passing the token early, in case the dataset is private
    token: previewDrafts ? readToken : undefined, // Use the token only for draft mode
    perspective: previewDrafts ? 'previewDrafts' : 'published',
  })

  // If there is no token but draft mode has been enabled, it's a sign that the app isn't fully configured yet
  if (previewDrafts && !readToken) {
    throw new Error('You must provide a token to preview drafts')
  }

  return client
}
