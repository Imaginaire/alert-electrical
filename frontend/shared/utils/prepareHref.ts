/**
  Prepare the href for the link component. Depending on the setup, trailing slashes can be added or removed here.
  Put all slugs through this function to ensure consistency.
 */

import getBaseUrl from './getBaseUrl'

export default function prepareHref(slug?: string, type?: string): string {
  if (!slug) {
    return getBaseUrl()
  }

  switch (type) {
    case 'home':
      return getBaseUrl()
    default:
      return `${getBaseUrl()}${slug}/`
  }
}
