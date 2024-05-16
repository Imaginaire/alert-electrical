/* 
Utility function to get the url for an image from Sanity
*/

import {getClient} from '@/lib/sanity.client'
import imageUrlBuilder from '@sanity/image-url'

export default function urlForImage(source: any) {
  const client = getClient()
  const builder = imageUrlBuilder(client)
  return builder.image(source)
}
