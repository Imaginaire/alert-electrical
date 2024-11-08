import {NavbarProps} from '@/types'
import Desktop from './Desktop'
import Mobile from './Mobile'
import DeliveryInfoBar from './DeliveryInfoBar'

export default function Navbar({
  menuItems,
  upperMenuItems,
  upperMenuCtaText,
  companyInfo,
  deliveryInfoBar,
}: NavbarProps) {
  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden md:flex flex-col">
        <Desktop
          menuItems={menuItems}
          upperMenuItems={upperMenuItems}
          upperMenuCtaText={upperMenuCtaText}
          companyInfo={companyInfo}
        />
      </nav>

      {/* Mobile Nav */}
      <nav className="md:hidden z-50">
        <Mobile menuItems={menuItems} companyInfo={companyInfo} />
      </nav>

      {deliveryInfoBar && <DeliveryInfoBar info={deliveryInfoBar.info} />}
    </>
  )
}
