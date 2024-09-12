import {NavbarProps} from '@/types'
import Desktop from './Desktop'
import MobileCtaBanner from './MobileCtaBanner'
import DesktopCtaBanner from './DesktopCtaBanner'

export default function Navbar({menuItems, companyInfo, contactPage, navCta}: NavbarProps) {
  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden lg:block">
        {navCta && <DesktopCtaBanner ctas={navCta.ctas} />}

        <Desktop menuItems={menuItems} companyInfo={companyInfo} contactPage={contactPage} />
      </nav>

      {/* Mobile Nav */}
      <nav className="lg:hidden z-50">{navCta && <MobileCtaBanner ctas={navCta.ctas} />}</nav>
    </>
  )
}
