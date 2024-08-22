import {NavbarProps} from '@/types'
import Desktop from './Desktop'
import CtaBanner from '@/components/sections/CtaBanner'

export default function Navbar({menuItems, companyInfo, contactPage, settings}: NavbarProps) {
  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden sm:block">
        <Desktop menuItems={menuItems} companyInfo={companyInfo} contactPage={contactPage} />
      </nav>

      {/* Mobile Nav */}
      <nav className="sm:hidden z-50">
        {settings?.navCta ? <CtaBanner navCta={settings?.navCta} /> : null}
      </nav>
    </>
  )
}
