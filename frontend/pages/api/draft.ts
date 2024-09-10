/**
 * This file is a draft mode API route that is used to enable draft mode in the frontend. This is used to preview the unpublished changes in the Sanity Studio.
 */

import type {NextApiRequest, NextApiResponse} from 'next'
import {validatePreviewUrl} from '@sanity/preview-url-secret'
import {getClient} from '@/lib/sanity.client'

const clientWithToken = getClient(true)

export default async function handler(req: NextApiRequest, res: NextApiResponse<string | void>) {
  if (!req.url) {
    throw new Error('Missing url')
  }
  const {isValid, redirectTo = '/'} = await validatePreviewUrl(clientWithToken, req.url)
  if (!isValid) {
    return res.status(401).send('Invalid secret')
  }
  // Enable Draft Mode by setting the cookies
  res.setDraftMode({enable: true})
  res.writeHead(307, {Location: redirectTo})
  res.end()
}
