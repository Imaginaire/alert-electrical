/**
 * This API route is used to disable "Draft Mode" for the current user.
 * This is used to exit the user from the preview mode in the Sanity Studio.
 */

import type {NextApiRequest, NextApiResponse} from 'next'

export default function handler(_req: NextApiRequest, res: NextApiResponse<void>): void {
  // Exit the current user from "Draft Mode".
  res.setDraftMode({enable: false})

  // Redirect the user back to the index page.
  res.writeHead(307, {Location: '/'})
  res.end()
}
