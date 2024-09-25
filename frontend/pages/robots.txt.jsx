/* 
Function for dynamically creating robots.txt file based off settings in the Sanity Studio. Will default to allow all if no settings are set.
 */

import {groq} from 'next-sanity'
import {getClient} from '../lib/sanity.client'

export default function Robots() {
  return <div> loading </div>
}

// generates the base url for the site based on the environment for the robots.txt file
function getBaseURL() {
  let baseURL = ''
  if (process.env.NEXT_PUBLIC_ENV === 'production') {
    baseURL = process.env.NEXT_PUBLIC_PRODUCTION_URL
  } else if (process.env.NODE_ENV === 'development') {
    baseURL = process.env.NEXT_PUBLIC_DEVELOPMENT_URL
  } else {
    baseURL = 'http://localhost:3000'
  }
  return baseURL
}

// generates the robots.txt file based on the site settings, or defaults to allow all
function generateRobots(siteRobots) {
  let robots = ''

  if (siteRobots?.robotsTxt?.content) {
    robots = siteRobots.robotsTxt.content
  } else {
    robots = `User-agent: *\nDisallow:`
  }

  // add sitemap to robots.txt
  robots += `\n\nSitemap: ${getBaseURL()}sitemap.xml`

  return robots
}

export async function getServerSideProps({res}) {
  const client = getClient()

  const query = groq`
      *[_type == "settings"][0] {
      robotsTxt {
        content
      }
      }`

  const getSiteRobots = await client.fetch(query)

  const robots = generateRobots(getSiteRobots)

  res.setHeader('Content-Type', 'text/plain')
  res.write(robots)
  res.end()

  return {
    props: {},
  }
}
