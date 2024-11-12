import {FooterProps} from '@/types'
import Desktop from './Desktop'
import Mobile from './Mobile'
import Newsletter from './Newsletter'

export default function Footer({footer, companyInfo, socialMedia, newsletter}: FooterProps) {
  return (
    <>
      {newsletter && <Newsletter newsletter={newsletter} />}
      {/* Desktop Footer */}
      {footer && <Desktop footer={footer} companyInfo={companyInfo} socialMedia={socialMedia} />}

      {/* Mobile Footer */}
      {footer && <Mobile footer={footer} companyInfo={companyInfo} socialMedia={socialMedia} />}
    </>
  )
}
