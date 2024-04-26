/**
 * Prepare meta robots string from robotsMeta object
 * @param robotsMeta - object with boolean values for each robot meta tag
 */

interface RobotsMeta {
  noindex?: boolean
  nofollow?: boolean
  noarchive?: boolean
  noimageindex?: boolean
  nosnippet?: boolean
}

export default function prepareMetaRobots(robotsMeta: RobotsMeta, siteNoIndex: boolean) {
  // init empty string
  let metaRobots = ''

  if (siteNoIndex) {
    return 'noindex'
  }

  // loop through robotsMeta object and add to string if true
  Object.entries(robotsMeta || {}).forEach(([key, value]) => {
    if (value) {
      if (key === 'noindex' && siteNoIndex) {
        return
      }
      metaRobots += `${key}, `
    } else {
      // if noindex and nofollow are false, add follow and index as default
      if (key === 'noindex' && !siteNoIndex) {
        metaRobots += 'index, '
      } else if (key === 'nofollow') {
        metaRobots += 'follow, '
      }
    }
  })

  // remove trailing comma and space
  metaRobots = metaRobots.slice(0, -2)

  return metaRobots
}
