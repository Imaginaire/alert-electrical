import {Footer as FooterType} from '@/types'
import Desktop from './Desktop'
import Mobile from './Mobile'

export default function Footer(footer: FooterType) {
  return (
    <>
      {/* Desktop Footer */}
      <Desktop footer={footer} />
      {/* Mobile Footer */}
      <Mobile footer={footer} />
    </>
  )
}
