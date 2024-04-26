/* 
Gets the canonical URL for the current page for use with the SEO Pane plugin
*/

export default function getCanonicalUrl(slug: string) {
  let url: string = ''

  if (process.env.VERCEL_ENV === 'production') {
    url = process.env.PRODUCTION_URL as string
  } else if (process.env.VERCEL_ENV === 'development') {
    url = process.env.DEVELOPMENT_URL as string
  } else {
    url = 'http://localhost:3000/'
  }

  //   // add www. to the url if it's not there for both http and https
  //   if (!url.includes('www.')) {
  //     if (url.includes('http://')) {
  //       url = url.replace('http://', 'http://www.')
  //     } else if (url.includes('https://')) {
  //       url = url.replace('https://', 'https://www.')
  //     }
  //   }

  // console.log(`${url}${asPath}`)

  return `${url}${slug}/`
}
