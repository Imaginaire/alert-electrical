/**
 * Load a section component dynamically based on the type
 */

import dynamic from 'next/dynamic'

export const loadSectionComponent = (type: string) => {
  // capitalise first letter to correspond with component name
  type = type.charAt(0).toUpperCase() + type.slice(1)

  console.log(type)

  // return dynamic import of section component
  return dynamic(() => import(`../../components/sections/${type}`))
}
