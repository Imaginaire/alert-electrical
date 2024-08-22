import {NavbarProps} from '@/types'
import Desktop from './Desktop'
import MobileCtaBanner from './MobileCtaBanner'
import DesktopCtaBanner from './DesktopCtaBanner'

export default function Navbar({menuItems, companyInfo, contactPage, settings}: NavbarProps) {
  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden sm:block">
        {settings?.navCta && <DesktopCtaBanner navCta={settings?.navCta} />}

        <Desktop menuItems={menuItems} companyInfo={companyInfo} contactPage={contactPage} />
      </nav>

      {/* Mobile Nav */}
      <nav className="sm:hidden z-50">
        {settings?.navCta && <MobileCtaBanner navCta={settings?.navCta} />}
      </nav>
    </>
  )
}
