import {FooterProps} from '@/types'
import Desktop from './Desktop'
import Mobile from './Mobile'

export default function Footer({footer, companyInfo, socialMedia}: FooterProps) {
  return (
    <>
      {/* Desktop Footer */}
      {footer && <Desktop footer={footer} companyInfo={companyInfo} socialMedia={socialMedia} />}

      {/* Mobile Footer */}
      {footer && <Mobile footer={footer} companyInfo={companyInfo} socialMedia={socialMedia} />}
    </>
  )
}
