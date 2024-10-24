/* 
Gets the canonical URL for the current page for use with the SEO Pane plugin
*/

export default function getCanonicalUrl(slug: string) {
  let url: string = ''

  if (process.env.NEXT_PUBLIC_ENV === 'production') {
    url = process.env.NEXT_PUBLIC_PRODUCTION_URL as string
  } else if (process.env.NEXT_PUBLIC_ENV === 'development') {
    url = process.env.NEXT_PUBLIC_DEVELOPMENT_URL as string
  } else {
    url = 'http://localhost:3000/'
  }

  let canonicalUrl = `${url}${slug}`

  // if doesn't have a trailing slash, add it otherwise leave it
  if (!canonicalUrl.endsWith('/')) {
    canonicalUrl = canonicalUrl + '/'
  }

  return canonicalUrl
}
