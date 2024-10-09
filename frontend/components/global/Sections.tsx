/**
 * Sections component that renders section components based on the _type
 */

import type {Sections, SettingsPayload} from '@/types'
import {loadSectionComponent} from '@/shared/utils/loadSectionComponent'

interface SectionsProps {
  sections: Sections[]
  settings: SettingsPayload | undefined
}

export default function Sections({sections, settings}: SectionsProps) {
  return (
    <>
      {sections && sections.length > 0 && (
        <>
          {sections.map((section, index) => {
            const SectionComponent = loadSectionComponent(section._type)
            const props = {...section, settings}
            return <SectionComponent key={index} {...props} />
          })}
        </>
      )}
    </>
  )
}
