/**
 * Sections component that renders section components based on the _type
 */

import type {Sections} from '@/types'
import {loadSectionComponent} from '@/shared/utils/loadSectionComponent'

interface SectionsProps {
  sections: Sections[]
}

export default function Sections({sections}: SectionsProps) {
  console.log(sections)

  return (
    <>
      {sections && sections.length > 0 && (
        <>
          {sections.map((section, index) => {
            const SectionComponent = loadSectionComponent(section._type)
            return <SectionComponent key={index} {...section} />
          })}
        </>
      )}
    </>
  )
}
