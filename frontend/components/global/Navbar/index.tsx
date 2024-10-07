import {NavbarProps} from '@/types'
import Desktop from './Desktop'
import MobileCtaBanner from './MobileCtaBanner'
import DesktopCtaBanner from './DesktopCtaBanner'
import Mobile from './Mobile'
import DeliveryInfoBar from './DeliveryInfoBar'

export default function Navbar({
  menuItems,
  menuItemsRight,
  companyInfo,
  contactPage,
  navCta,
  deliveryInfoBar,
}: NavbarProps) {
  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden lg:block">
        {navCta && <DesktopCtaBanner ctas={navCta.ctas} />}
        <Desktop
          menuItems={menuItems}
          companyInfo={companyInfo}
          contactPage={contactPage}
          menuItemsRight={menuItemsRight}
        />
      </nav>

      {/* Mobile Nav */}
      <nav className="lg:hidden z-50">{navCta && <MobileCtaBanner ctas={navCta.ctas} />}</nav>
      <Mobile
        menuItems={menuItems}
        companyInfo={companyInfo}
        contactPage={contactPage}
        menuItemsRight={menuItemsRight}
      />

      {deliveryInfoBar && <DeliveryInfoBar info={deliveryInfoBar.info} />}
    </>
  )
}
