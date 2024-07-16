/**
 * Client settings for Sanity Studio backend. This is used to connect to the Sanity API from the Studio.
 */

import {createClient} from '@sanity/client'
import {SanityClient} from 'sanity'
import {getStudioEnvironmentVariables} from 'sanity/cli'

export function getClient(): SanityClient {
  const client = createClient({
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
    apiVersion: '2023-06-21',
    useCdn: true,
    token: process.env.SANITY_STUDIO_API_READ_TOKEN || '',
    perspective: 'published',
  })

  return client.withConfig({
    useCdn: true,
    perspective: 'previewDrafts',
  })
}
