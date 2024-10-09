import {createContext, useContext, useState} from 'react'

interface BreadcrumbContextType {
  breadcrumbs: {path: string; title: string}[]
  setBreadcrumbsFromUrl: (url: string) => void
}

// Create the Breadcrumb Context
const BreadcrumbContext = createContext<BreadcrumbContextType | null>(null)

export const BreadcrumbProvider = ({children}: {children: any}) => {
  const [breadcrumbs, setBreadcrumbs] = useState<{path: string; title: string}[]>([])

  const setBreadcrumbsFromUrl = (url: string) => {
    if (!url || typeof url !== 'string') {
      // Safeguard: If the URL is undefined or not a string, return early.
      console.error('Invalid URL passed to setBreadcrumbsFromUrl:', url)
      return
    }

    const ignoredSegments = ['product-category', 'brand', 'ignore-this'] // Add ignored segments here

    // Split the URL into an array of segments and filter out ignored segments if the url can be split
    const pathArray = url.split('/').filter((part) => part && !ignoredSegments.includes(part))

    // Reset breadcrumbs and build path incrementally
    let currentPath = '' // Local variable to store incremental path

    const breadcrumbPaths = pathArray.map((segment) => {
      let title = ''
      // Handle special cases
      if (segment === 'shop' || segment === 'product') {
        title = 'All Products'
        currentPath = '/shop'
        return {path: currentPath, title}
      }

      // Build the path incrementally
      currentPath += `/${segment}`

      // Convert segment to a readable title and capitalize first letter of each word
      title = segment.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())

      return {path: currentPath, title}
    })

    // Set new breadcrumbs
    setBreadcrumbs(breadcrumbPaths)
  }

  return (
    <BreadcrumbContext.Provider value={{breadcrumbs, setBreadcrumbsFromUrl}}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

// Custom hook to use BreadcrumbContext
export const useBreadcrumbs = () =>
  useContext(BreadcrumbContext) || {breadcrumbs: [], setBreadcrumbsFromUrl: () => {}}
