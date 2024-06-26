/**
 * Client settings for Sanity Studio backend. This is used to connect to the Sanity API from the Studio.
 */

import {createClient} from '@sanity/client'
import {SanityClient} from 'sanity'

export function getClient(): SanityClient {
  const client = createClient({
    projectId: 'uxhlerf5',
    dataset: 'production',
    apiVersion: '2023-06-21',
    useCdn: true,
    token:
      'skeSzBLNRKJinRAkNFv9VBwTitODlGX90ss4w3EWuS1IyNa3ih1BbWhsfFracrcgCywZJLxvyAg4iI6JS2wCQEIypkLKhImuH5EQYdUP90JS3AH2H7rTcQsa1qZTcpBfY5d526TSw8XmMHHo42XkGm5aN7NBn3zT55nfQloB0fQVgsrIQxoY',
    perspective: 'published',
  })

  return client.withConfig({
    useCdn: true,
    perspective: 'previewDrafts',
  })
}
