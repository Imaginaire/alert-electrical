import {NavbarProps} from '@/types'
import Desktop from './Desktop'
import CallToActionBanner from '@/components/sections/CtaBanner'

export default function Navbar({menuItems, companyInfo, contactPage, settings}: NavbarProps) {
  return (
    <>
      <CallToActionBanner
        leftText={settings?.navCta?.leftText}
        middleText={settings?.navCta?.middleText}
        rightText={settings?.navCta?.rightText}
      />
      <Desktop menuItems={menuItems} companyInfo={companyInfo} contactPage={contactPage} />
    </>
  )
}
